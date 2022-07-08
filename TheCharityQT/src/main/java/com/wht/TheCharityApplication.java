package com.wht;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.wht.mapper")
public class TheCharityApplication {
    public static void main(String[] args) {
        SpringApplication.run(TheCharityApplication.class, args);
    }
}
