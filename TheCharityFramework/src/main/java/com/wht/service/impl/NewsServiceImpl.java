package com.wht.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.News;
import com.wht.domain.vo.DaysNewsVo;
import com.wht.mapper.NewsMapper;
import com.wht.service.NewsService;
import com.wht.utils.TheCharityConst;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * 新闻资讯表(News)表服务实现类
 *
 * @author makejava
 * @since 2022-04-20 10:29:28
 */
@Service("newsService")
public class NewsServiceImpl extends ServiceImpl<NewsMapper, News> implements NewsService {


    @Override
    public ResponseEntity<Page<News>> getNewsPage(Integer pageNum, Integer pageSize, String keyword) {
        ResponseEntity<Page<News>> responseEntity = null;
        Page<News> newsPage = null;
        //分页查询
        //如果有查询条件
        if(!"".equals(keyword)){
            LambdaQueryWrapper<News> queryWrapper = new LambdaQueryWrapper<>();
            //根据查询条件查询(标题、作者、创建时间、资讯摘要)
            queryWrapper.like(News::getTitle,keyword).or().like(News::getAuthor,keyword).or()
                    .like(News::getCreateTime,keyword).or().like(News::getSummary,keyword);
            newsPage = page(new Page<>(pageNum, pageSize), queryWrapper);
        }else{
            newsPage = page(new Page<>(pageNum, pageSize));
        }

        //返回结果
        if(newsPage != null){
            responseEntity = ResponseEntity.successWithData(newsPage);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<News>> getHotSpotlight() {
        ResponseEntity responseEntity = null;
        List<News> newsList = page(new Page<News>(1, 3), new LambdaQueryWrapper<News>().eq(News::getType, TheCharityConst.ATTR_NAME_HOT_NEWS)).getRecords();
        if(newsList != null && newsList.size() != 0){
            responseEntity = ResponseEntity.successWithData(newsList);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<News>> getPublicHeadlines() {
        ResponseEntity responseEntity = null;
        List<News> newsList = page(new Page<News>(1, 3), new LambdaQueryWrapper<News>().eq(News::getType, TheCharityConst.ATTR_NAME_PUBLIC_HEADLINE)).getRecords();
        if(newsList != null && newsList.size() != 0){
            responseEntity = ResponseEntity.successWithData(newsList);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<News> getTodayNews() {
        ResponseEntity responseEntity = null;
        List<News> news = page(new Page<News>(1, 1), new LambdaQueryWrapper<News>().eq(News::getType, TheCharityConst.ATTR_NAME_TODAY_NEWS)).getRecords();
        if(news != null && news.size() != 0){
            responseEntity = ResponseEntity.successWithData(news.get(0));
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<News>> getRecentlyNews() {
        ResponseEntity<List<News>> responseEntity = null;
        //查询根据日期排序
        Page<News> newsPage = page(new Page<News>(1, 3), new LambdaQueryWrapper<News>().orderByDesc(News::getCreateTime));
        List<News> newsList = newsPage.getRecords();
        //返回数据
        if(newsList != null && newsList.size() > 0){
            responseEntity = ResponseEntity.successWithData(newsList);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<List<DaysNewsVo>> getDaysNewsData() {
        ResponseEntity<List<DaysNewsVo>> responseEntity = null;
        //首先获取近日日期
        LocalDate now = LocalDate.now();
        ArrayList<DaysNewsVo> daysNewsVos = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            //从近日开始往前统计10天
            LocalDate date = now.minusDays(i);
            //获取当天的新闻发布数
            int count = count(new LambdaQueryWrapper<News>().like(News::getCreateTime, date.toString()));
            //添加进list
            daysNewsVos.add(new DaysNewsVo(date,count));
        }
        //返回数据
        if(daysNewsVos.size() > 0){
            responseEntity = ResponseEntity.successWithData(daysNewsVos);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }
}
