package com.wht.config;

import com.wht.filter.AdminLoginFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
@Configuration
public class FilterConfig implements WebMvcConfigurer {

    @Bean
    public FilterRegistrationBean testFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean(new AdminLoginFilter());
        //设置拦截路径
        ArrayList<String> patterns = new ArrayList<>();
        patterns.add("/index.html");
        patterns.add("/");
        patterns.add("/table_causes.html");
        patterns.add("/table_comments.html");
        patterns.add("/table_donate.html");
        patterns.add("/table_news.html");
        patterns.add("/table_volunteer.html");
        registration.setUrlPatterns(patterns);
        registration.setName("adminLoginFilter");
        return registration;
    }
}
