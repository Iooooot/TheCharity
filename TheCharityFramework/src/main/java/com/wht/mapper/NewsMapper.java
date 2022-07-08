package com.wht.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wht.domain.entity.News;
import org.springframework.stereotype.Repository;


/**
 * 新闻资讯表(News)表数据库访问层
 *
 * @author makejava
 * @since 2022-04-20 10:29:27
 */
@Repository
public interface NewsMapper extends BaseMapper<News> {

}

