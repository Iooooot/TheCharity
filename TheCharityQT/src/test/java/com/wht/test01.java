package com.wht;

import com.wht.domain.entity.User;
import com.wht.service.UserService;
import com.wht.utils.MailUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;

@SpringBootTest
public class test01 {
    @Autowired
    UserService userService;
    @Test
    public void testEmailSend(){
        String checkCode =MailUtils.creatCode(5);
        String content = "我们已收到您注册账号的申请啦。<br/><br/>您的注册账号验证码为: "+checkCode +"<br/><br/>如果你没有请求此代码，可放心忽略这封电子邮件。别人可能错误地键入了你的电子邮件地址。";
        MailUtils.sendMail("1725453353@qq.com",content,"测试邮件");
        System.out.println("发送成功");
    }

    @Test
    public void testCheckCode(){
        System.out.println(MailUtils.creatCode(5));
    }
    @Test
    public void testInsert(){
        User user = new User();
        user.setUserName("13546123");
        user.setPassword("1231");
        user.setEmail("1354654@qq.com");
        userService.userRegister(user);
    }
    @Test
    public void testRoad() throws FileNotFoundException {
        String realPath= ResourceUtils.getURL("classpath:static").getPath() + "/images";
        System.out.println(realPath);
        File file = new File(realPath);
        if(!file.exists()){
            System.out.println("文件夹不存在");
        }else{
            System.out.println("文件夹有");
        }
    }
}
