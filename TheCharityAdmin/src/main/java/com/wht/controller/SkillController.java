package com.wht.controller;

import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Skill;
import com.wht.service.SkillService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("skill")
public class SkillController {

    @Autowired
    SkillService skillServiceImpl;

    @GetMapping("getSkills")
    public ResponseEntity<List<Skill>> getSkills(){
        ResponseEntity<List<Skill>> responseEntity = null;
        List<Skill> skills = skillServiceImpl.list();
        if(skills != null){
            responseEntity = ResponseEntity.successWithData(skills);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }
}
