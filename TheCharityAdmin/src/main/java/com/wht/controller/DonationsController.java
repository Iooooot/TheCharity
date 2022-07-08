package com.wht.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Donations;
import com.wht.service.DonationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("donations")
public class DonationsController {

    @Autowired
    DonationsService donationsServiceImpl;

    @PostMapping("getDonationsPage")
    public ResponseEntity<Page<Donations>> getDonationsPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                            @RequestParam(value = "pageSize",defaultValue = "8") Integer pageSize,
                                                            @RequestParam(value = "keyword",defaultValue = "")String keyword){
        return donationsServiceImpl.getDonationsPage(pageNum,pageSize,keyword);
    }
}
