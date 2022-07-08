package com.wht.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wht.domain.entity.Skill;
import com.wht.mapper.SkillMapper;
import com.wht.service.SkillService;
import org.springframework.stereotype.Service;

/**
 * 志愿者专业技能表(Skill)表服务实现类
 *
 * @author makejava
 * @since 2022-04-23 20:52:27
 */
@Service("skillService")
public class SkillServiceImpl extends ServiceImpl<SkillMapper, Skill> implements SkillService {

}
