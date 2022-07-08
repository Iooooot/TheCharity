package com.wht.controller;

import com.wht.domain.ResponseEntity;
import com.wht.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("volunteer")
public class VolunteerController {

    @Autowired
    VolunteerService volunteerServiceImpl;

    /***
     * 获取志愿者人数
     * @return
     */
    @GetMapping("getVolunteerNum")
    public ResponseEntity<Integer> getVolunteerNum(){
        return volunteerServiceImpl.getVolunteerNum();
    }
}
