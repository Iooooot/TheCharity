package com.wht.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Skill;
import com.wht.domain.entity.Volunteer;
import com.wht.mapper.VolunteerMapper;
import com.wht.service.SkillService;
import com.wht.service.VolunteerService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 志愿者表(Volunteer)表服务实现类
 *
 * @author makejava
 * @since 2022-04-19 11:04:42
 */
@Service("volunteerService")
public class VolunteerServiceImpl extends ServiceImpl<VolunteerMapper, Volunteer> implements VolunteerService {

    @Autowired
    SkillService skillServiceImpl;


    @Override
    public ResponseEntity<Integer> getVolunteerNum() {
        ResponseEntity responseEntity = null;
        //获取人数
        int count = count();
        if(count >= 0){
            responseEntity = ResponseEntity.successWithData(count);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Page<Volunteer>> getVolunteerPage(Integer pageNum, Integer pageSize, String keyword) {
        ResponseEntity<Page<Volunteer>> responseEntity = null;
        //进行分页查询
        Page<Volunteer> volunteerPage = null;
        //首先看是否是根据技能名称查询
        if(keyword != null && !"".equals(keyword)){
            Skill skill = skillServiceImpl.getOne(new LambdaQueryWrapper<Skill>().eq(Skill::getSkillName, keyword));
            if(skill != null){
                volunteerPage = page(new Page<Volunteer>(pageNum, pageSize),new LambdaQueryWrapper<Volunteer>().eq(Volunteer::getSkillId,skill.getId()));
            }else{
                //不是再根据名字，电话，地址，邮箱，创建时间查询
                volunteerPage = page(new Page<Volunteer>(pageNum, pageSize),new LambdaQueryWrapper<Volunteer>().like(Volunteer::getName,keyword).
                        or().like(Volunteer::getPhoneNumber,keyword).or().like(Volunteer::getCreateTime,keyword).or().like(Volunteer::getEmail,keyword).or()
                        .like(Volunteer::getAddress,keyword));
            }
        }else{
            volunteerPage = page(new Page<Volunteer>(pageNum, pageSize));
        }

        //查询出捐助者名字
        List<Volunteer> records = volunteerPage.getRecords();
        for (Volunteer record : records) {
            String skillName = skillServiceImpl.getById(record.getSkillId()).getSkillName();
            record.setSkill(skillName);
        }
        volunteerPage.setRecords(records);
        if(volunteerPage != null){
            responseEntity = ResponseEntity.successWithData(volunteerPage);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }
}
