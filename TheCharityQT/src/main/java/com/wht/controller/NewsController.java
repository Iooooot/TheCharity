package com.wht.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.News;
import com.wht.service.NewsService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("news")
public class NewsController {

    @Autowired
    NewsService newsServiceImpl;

    /***
     * 分页查询新闻资讯
     * @param pageNum
     * @param pageSize
     * @param keyword
     * @return
     */
    @PostMapping("/getNewsPage")
    public ResponseEntity<Page<News>> getNewsPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                  @RequestParam(value = "pageSize",defaultValue = "5") Integer pageSize,
                                                  @RequestParam(value = "keyword",defaultValue = "")String keyword){
        return newsServiceImpl.getNewsPage(pageNum,pageSize,keyword);
    }

    /***
     * 获取热点聚焦
     * @return
     */
    @GetMapping("getHotSpotlight")
    public ResponseEntity<List<News>> getHotSpotlight(){
        return newsServiceImpl.getHotSpotlight();
    }
    /***
     * 获取公益头条
     * @return
     */
    @GetMapping("getPublicHeadlines")
    public ResponseEntity<List<News>> getPublicHeadlines(){
        return newsServiceImpl.getPublicHeadlines();
    }
    /***
     * 获取今日要闻
     * @return
     */
    @GetMapping("getTodayNews")
    public ResponseEntity<News> getTodayNews(){
        return newsServiceImpl.getTodayNews();
    }

    /***
     * 根据id查询资讯
     * @param id
     * @return
     */
    @GetMapping("getNewsById")
    public ResponseEntity<News> getNewsById(Long id){
        ResponseEntity responseEntity = null;
        News news = newsServiceImpl.getById(id);
        if(news != null){
            responseEntity = ResponseEntity.successWithData(news);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 获取最新资讯
     * @return
     */
    @GetMapping("getRecentlyNews")
    public ResponseEntity<List<News>> getRecentlyNews(){
        return newsServiceImpl.getRecentlyNews();
    }
}
