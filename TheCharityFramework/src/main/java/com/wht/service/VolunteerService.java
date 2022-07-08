package com.wht.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Volunteer;


/**
 * 志愿者表(Volunteer)表服务接口
 *
 * @author makejava
 * @since 2022-04-19 11:04:42
 */
public interface VolunteerService extends IService<Volunteer> {
    //获取志愿者人数
    ResponseEntity<Integer> getVolunteerNum();
    //分页查询志愿者
    ResponseEntity<Page<Volunteer>> getVolunteerPage(Integer pageNum, Integer pageSize, String keyword);
}
