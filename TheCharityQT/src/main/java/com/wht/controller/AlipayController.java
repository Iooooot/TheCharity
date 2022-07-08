package com.wht.controller;

import com.alipay.easysdk.factory.Factory;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.wht.domain.entity.Causes;
import com.wht.domain.entity.Donations;
import com.wht.service.AliPayService;
import com.wht.service.CausesService;
import com.wht.service.DonationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/alipay")
public class AlipayController {

    @Autowired
    DonationsService donationsServiceImpl;

    @Autowired
    CausesService causesServiceImpl;

    @Autowired
    AliPayService aliPayServiceImpl;

    /***
     * 支付宝网站支付
     * @param tradeNo
     * @return
     */
    @GetMapping("/pay")
    public void  pay(@RequestParam("tradeNo") String tradeNo,HttpServletResponse response) throws IOException {
        //首先获取捐助订单
        Donations order = donationsServiceImpl.getOne(new LambdaQueryWrapper<Donations>().eq(Donations::getTradeNo, tradeNo));
        //调用支付宝接口获取支付表单
        String result = aliPayServiceImpl.alipayPagePay("慈善捐助", order.getTradeNo(), String.valueOf(order.getAmount()));
        //将支付表单回显页面
        response.setContentType( "text/html;charset="  + "UTF-8");
        response.getWriter().write(result); //直接将完整的表单html输出到页面
        response.getWriter().flush();
        response.getWriter().close();
    }

    @PostMapping("/notify")  // 注意这里必须是POST接口
    public void payNotify(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("=========支付宝异步回调========");
        //获取支付宝请求的参数
        Map<String, String> params = getAllRequestParam(request);
        // 支付宝验签
        if (Factory.Payment.Common().verifyNotify(params)) {
            // 验签通过
            if("TRADE_SUCCESS".equals(params.get("trade_status"))){
                //交易成功
                String tradeNo = params.get("out_trade_no");
                if(tradeNo != null){
                    // 更新订单未已支付
                    Donations donations = new Donations();
                    donations.setStatus("1");
                    boolean flag = donationsServiceImpl.update(donations, new LambdaUpdateWrapper<Donations>().eq(Donations::getTradeNo, tradeNo));
                    if (flag) {
                        Donations one = donationsServiceImpl.getOne(new LambdaQueryWrapper<Donations>().eq(Donations::getTradeNo, tradeNo));
                        //增加慈善项目的raised值
                        Causes causes = causesServiceImpl.getById(one.getCauseId());
                        causes.setRaised((int)(causes.getRaised()+one.getAmount()));
                        causesServiceImpl.updateById(causes);
                    }
                }
            }
        }
    }

    private Map<String, String> getAllRequestParam(HttpServletRequest request) {
        Map<String,String> res = new HashMap<>();
        Enumeration<String> parameterNames = request.getParameterNames();
        while(parameterNames.hasMoreElements()){
            String temp = parameterNames.nextElement();
            String parameter = request.getParameter(temp);
            res.put(temp,parameter);
        }
        return res;


    }


}
