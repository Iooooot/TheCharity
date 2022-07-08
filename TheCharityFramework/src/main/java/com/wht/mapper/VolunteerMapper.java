package com.wht.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wht.domain.entity.Volunteer;
import org.springframework.stereotype.Repository;


/**
 * 志愿者表(Volunteer)表数据库访问层
 *
 * @author makejava
 * @since 2022-04-19 11:04:41
 */
@Repository
public interface VolunteerMapper extends BaseMapper<Volunteer> {

}

