package com.wht.service.impl;

import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.util.ResponseChecker;
import com.alipay.easysdk.payment.page.models.AlipayTradePagePayResponse;
import com.wht.service.AliPayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/***
 * 支付宝接口实现类
 */
@Service
@Slf4j
public class AliPayServiceImpl implements AliPayService {

    /***
     * 网站支付
     * @param subject
     * @param outTradeNo
     * @param totalAmount
     * @return
     */
    @Override
    public String alipayPagePay(String subject, String outTradeNo, String totalAmount) {
        try {
            //1.发起api调用
            AlipayTradePagePayResponse response = Factory.Payment.Page()
                    .pay(subject, outTradeNo, totalAmount,"http://localhost:8081/TheCharity/payLoading.html");
            //2.处理异常
            //判断是否支付成功
            if(ResponseChecker.success(response)){
                log.info("调用成功",response);
                return response.getBody();
            }else{
                log.info("调用失败，原因："+response.getBody());
                return null;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
