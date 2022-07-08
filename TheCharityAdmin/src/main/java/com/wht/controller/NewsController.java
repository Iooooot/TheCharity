package com.wht.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Comments;
import com.wht.domain.entity.News;
import com.wht.domain.vo.DaysNewsVo;
import com.wht.service.CommentsService;
import com.wht.service.NewsService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("news")
public class NewsController {

    @Autowired
    NewsService newsServiceImpl;

    @Autowired
    CommentsService commentsServiceImpl;

    @RequestMapping("getNewsNum")
    public ResponseEntity<Integer> getNewsNum(){
        ResponseEntity<Integer> responseEntity = null;
        int count = newsServiceImpl.count();
        if(count >= 0){
            responseEntity = ResponseEntity.successWithData(count);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 获取近日新闻发布数
     * @return
     */
    @RequestMapping("getDaysNewsData")
    public ResponseEntity<List<DaysNewsVo>> getDaysNewsData(){
        return newsServiceImpl.getDaysNewsData();
    }

    /***
     * 分页查询
     * @param pageNum
     * @param pageSize
     * @param keyword
     * @return
     */
    @PostMapping("getNewsPage")
    public ResponseEntity<Page<News>> getNewsPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                  @RequestParam(value = "pageSize",defaultValue = "8") Integer pageSize,
                                                  @RequestParam(value = "keyword",defaultValue = "")String keyword){
        return newsServiceImpl.getNewsPage(pageNum,pageSize,keyword);
    }

    /***
     * 插入新闻资讯
     * @param news
     * @return
     */
    @PostMapping("insertNews")
    public ResponseEntity insertNews(News news){
        ResponseEntity responseEntity = null;
        boolean flag = newsServiceImpl.save(news);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 根据id查询资讯
     * @param id
     * @return
     */
    @GetMapping("getNews")
    public ResponseEntity<News> getCauses(Long id){
        ResponseEntity<News> responseEntity = null;
        News news = newsServiceImpl.getById(id);
        if(news != null){
            responseEntity = ResponseEntity.successWithData(news);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 更新资讯数据
     * @param news
     * @return
     */
    @PostMapping("updateNews")
    public ResponseEntity updateCauses(News news){
        ResponseEntity responseEntity = null;
        if("".equals(news.getBigpic())){
            news.setBigpic(null);
        }
        boolean flag = newsServiceImpl.updateById(news);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 删除单个资讯
     * @param id
     * @return
     */
    @GetMapping("delOneById")
    public ResponseEntity delOneById(Long id){
        ResponseEntity responseEntity = null;
        //根据id删除该资讯对应的评论
        boolean flag2 = delComments(id);
        boolean flag = newsServiceImpl.removeById(id);
        if(flag && flag2){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 根据资讯id删除该资讯评论
     * @param id
     * @return
     */
    private boolean delComments(Long id) {
        News news = newsServiceImpl.getById(id);
        int count = commentsServiceImpl.count(new LambdaQueryWrapper<Comments>().eq(Comments::getNewsId, news.getId()));
        if(count > 0){
            return commentsServiceImpl.remove(new LambdaQueryWrapper<Comments>().eq(Comments::getNewsId, news.getId()));
        }
        return true;
    }

    /***
     * 批量删除
     * @param arrId
     * @return
     */
    @Transactional
    @PostMapping("delNewsById")
    public ResponseEntity delByIds(@RequestParam("arrId[]") List<Long> arrId){
        ResponseEntity responseEntity = null;
        boolean flag2 = delComments(arrId);
        boolean flag = newsServiceImpl.removeByIds(arrId);
        if(flag && flag2){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 根据资讯id的list删除该资讯评论
     * @param ids
     * @return
     */
    private boolean delComments(List<Long> ids) {
        for (Long id : ids) {
            News news = newsServiceImpl.getById(id);
            if(news != null){
                int count = commentsServiceImpl.count(new LambdaQueryWrapper<Comments>().eq(Comments::getNewsId, news.getId()));
                if(count > 0){
                    boolean flag = commentsServiceImpl.remove(new LambdaQueryWrapper<Comments>().eq(Comments::getNewsId, news.getId()));
                    if(!flag){
                        return false;
                    }
                }
            }
        }
        return true;
    }

}
