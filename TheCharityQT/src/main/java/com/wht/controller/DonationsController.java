package com.wht.controller;

import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Donations;
import com.wht.service.DonationsService;
import com.wht.utils.SnowflakeUtils;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("donations")
public class DonationsController {

    @Autowired
    DonationsService donationsServiceImpl;


    @PostMapping("/makeDonation")
    public ResponseEntity<String> makeDonation(Donations donations){
        ResponseEntity<String> responseEntity = null;
        if(donations == null){
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_LOGIN_INCOMPLETE_INFORMATION);
        }else{
            //完善donations对象并存数据库
            donations.setTradeNo(SnowflakeUtils.getSnowId());
            //当前未支付
            donations.setStatus("0");
            //并且存入数据库
            boolean flag = donationsServiceImpl.save(donations);
            if(flag){
                //下单成功
                String payUrl = "http://localhost:8081/TheCharity/alipay/pay?tradeNo=" + donations.getTradeNo();
                responseEntity = ResponseEntity.successWithData(payUrl);
            }else{
                responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
            }
        }
        return responseEntity;
    }

    /***
     * 判断是否支付成功并响应项目id
     * @return
     */
    @GetMapping("judgePay")
    public ResponseEntity<String> judgePay(@RequestParam("tradeNo") String tradeNo){
        return donationsServiceImpl.judgePay(tradeNo);
    }

}
