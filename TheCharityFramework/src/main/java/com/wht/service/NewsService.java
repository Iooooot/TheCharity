package com.wht.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.News;
import com.wht.domain.vo.DaysNewsVo;

import java.util.List;


/**
 * 新闻资讯表(News)表服务接口
 *
 * @author makejava
 * @since 2022-04-20 10:29:28
 */
public interface NewsService extends IService<News> {
    //分页查询新闻资讯
    ResponseEntity<Page<News>> getNewsPage(Integer pageNum, Integer pageSize, String keyword);
    //获取热点聚焦
    ResponseEntity<List<News>> getHotSpotlight();
    //获取公益头条
    ResponseEntity<List<News>> getPublicHeadlines();
    //获取今日要闻
    ResponseEntity<News> getTodayNews();
    //获取最新资讯
    ResponseEntity<List<News>> getRecentlyNews();
    //获取近日资讯发布数量
    ResponseEntity<List<DaysNewsVo>> getDaysNewsData();
}
