package com.wht.config;

import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.Config;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Data
@Component
@ConfigurationProperties(prefix = "alipay")
public class AliPayConfig {
    private String appId;
    private String privateKey;
    private String publicKey;
    private String notifyUrl;


    @PostConstruct
    public void init() {
        // 设置参数（全局只需设置一次）
        Config options = getOptions();
        options.appId = this.appId;
        options.merchantPrivateKey = this.privateKey;
        options.alipayPublicKey = this.publicKey;
        options.notifyUrl = this.notifyUrl;
        Factory.setOptions(options);
        System.out.println("=======支付宝SDK初始化成功=======");
    }

    private Config getOptions() {
        Config config = new Config();
        config.protocol = "https";
        config.gatewayHost = "openapi.alipaydev.com";
        config.signType = "RSA2";
        return config;
    }
}
