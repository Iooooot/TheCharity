package com.wht.config;

import com.wht.filter.UserLoginFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
@Configuration
public class FilterConfig implements WebMvcConfigurer {
    /***
     * 配置判断登录过滤器
     * @return
     */
    @Bean
    public FilterRegistrationBean testFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean(new UserLoginFilter());
        //设置拦截路径
        ArrayList<String> patterns = new ArrayList<>();
        patterns.add("/single-causes.html");
        patterns.add("/single-news.html");
        registration.setUrlPatterns(patterns);
        registration.setName("userLoginFilter");
        return registration;
    }
}
