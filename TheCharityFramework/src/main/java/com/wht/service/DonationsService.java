package com.wht.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Donations;


/**
 * 捐助情况表(Donations)表服务接口
 *
 * @author makejava
 * @since 2022-04-22 15:04:28
 */
public interface DonationsService extends IService<Donations> {
    //判断是否支付成功
    ResponseEntity<String> judgePay(String tradeNo);
    //分页查询捐助情况
    ResponseEntity<Page<Donations>> getDonationsPage(Integer pageNum, Integer pageSize, String keyword);
}
