package com.wht.service;

/***
 * 调用支付宝接口的业务
 */
public interface AliPayService {
    //支付宝网站付
    String alipayPagePay(String subject, String outTradeNo, String totalAmount);
}
