package com.wht.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Comments;
import com.wht.domain.entity.News;
import com.wht.service.CommentsService;
import com.wht.service.NewsService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comments")
public class CommentsController {

    @Autowired
    CommentsService commentsServiceImpl;

    @Autowired
    NewsService newsServiceImpl;

    /***
     * 分页查询评论
     * @param pageNum
     * @param pageSize
     * @param keyword
     * @return
     */
    @PostMapping("getCommentsPage")
    public ResponseEntity<Page<Comments>> getCommentsPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                          @RequestParam(value = "pageSize",defaultValue = "8") Integer pageSize,
                                                          @RequestParam(value = "keyword",defaultValue = "")String keyword){
        return commentsServiceImpl.getCommentsPage(pageNum,pageSize,keyword);
    }

    /***
     * 删除单个数据
     * @param id
     * @return
     */
    @GetMapping("delOneById")
    public ResponseEntity delOneById(Long id){
        ResponseEntity responseEntity = null;
        //如果是根评论减少新闻资讯评论数
        boolean flag2 = reduceCommentsNum(id);
        boolean flag = commentsServiceImpl.removeById(id);
        if(flag && flag2){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 批量删除
     * @param arrId
     * @return
     */
    @PostMapping("delCommentsById")
    public ResponseEntity delCommentsById(@RequestParam("arrId[]") List<Long> arrId){
        ResponseEntity responseEntity = null;
        boolean flag2 = reduceCommentsNum(arrId);
        boolean flag = commentsServiceImpl.removeByIds(arrId);
        if(flag && flag2){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 根据评论id减少新闻资讯评论数
     * @param id
     * @return
     */
    public boolean reduceCommentsNum(Long id){
        Comments comments = commentsServiceImpl.getById(id);
        if(Long.compare(comments.getRootId(),TheCharityConst.ATTR_NAME_ROOT_COMMENT) == 0){
            //如果是根评论则删除时需要减少新闻资讯的评论数
            News news = newsServiceImpl.getById(comments.getNewsId());
            news.setCommentsNumber(news.getCommentsNumber() - 1);
            boolean flag = newsServiceImpl.updateById(news);
            return flag;
        }
        return true;
    }

    public boolean reduceCommentsNum(List<Long> ids){
        for (Long id : ids) {
            Comments comments = commentsServiceImpl.getById(id);
            if(Long.compare(comments.getRootId(),TheCharityConst.ATTR_NAME_ROOT_COMMENT) == 0){
                //如果是根评论则删除时需要减少新闻资讯的评论数
                News news = newsServiceImpl.getById(comments.getNewsId());
                news.setCommentsNumber(news.getCommentsNumber() - 1);
                boolean flag2 = newsServiceImpl.updateById(news);
                if(!flag2){
                    return false;
                }
            }
        }
        return true;
    }
}
