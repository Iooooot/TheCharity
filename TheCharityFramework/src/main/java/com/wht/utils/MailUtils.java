package com.wht.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;

/**
 * 发邮件工具类
 */
public final class MailUtils {
    private static final String USER = "个人邮箱"; // 发件人称号，同邮箱地址
    private static final String PASSWORD = "授权码"; // 如果是qq邮箱可以使户端授权码，或者登录密码

    /**
     *
     * @param to 收件人邮箱
     * @param text 邮件正文
     * @param title 标题
     */
    /* 发送验证信息的邮件 */
    public static boolean sendMail(String to, String text, String title){
        try {
            final Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.host", "smtp.qq.com");

            // 发件人的账号
            props.put("mail.user", USER);
            //发件人的密码
            props.put("mail.password", PASSWORD);

            // 构建授权信息，用于进行SMTP进行身份验证
            Authenticator authenticator = new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    // 用户名、密码
                    String userName = props.getProperty("mail.user");
                    String password = props.getProperty("mail.password");
                    return new PasswordAuthentication(userName, password);
                }
            };
            // 使用环境属性和授权信息，创建邮件会话
            Session mailSession = Session.getInstance(props, authenticator);
            // 创建邮件消息
            MimeMessage message = new MimeMessage(mailSession);
            // 设置发件人
            String username = props.getProperty("mail.user");
            InternetAddress form = new InternetAddress(username);
            message.setFrom(form);

            // 设置收件人
            InternetAddress toAddress = new InternetAddress(to);
            message.setRecipient(Message.RecipientType.TO, toAddress);

            // 设置邮件标题
            message.setSubject(title);

            // 设置邮件的内容体
            message.setContent(text, "text/html;charset=UTF-8");
            // 发送邮件
            Transport.send(message);
            return true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    public static String creatCode(int n) {
        //3、定义一个字符串变量记录生成的随机字符
        String code = "";
        Random r = new Random();
        //2、定义一个for循环，循环n次，依次生成随机字符
        for (int i = 0; i < n; i++) {

            //3、生成一个随机字符，英文大、小写 数字（0 1 2 ）
            // int type = r.nextInt(3);//0 1 2
            // switch (type) {
            //     case 0:
            //         //大写字符（A 65-Z 65+25）
            //         char ch = (char) (r.nextInt(26) + 65);
            //         code += ch;
            //         break;
            //     case 1:
            //         //小写字符（a 97-z 97+25）
            //         char ch1 = (char) (r.nextInt(26) + 97);
            //         code += ch1;
            //         break;
            //     case 2:
            //         //数字字符
            //         code += r.nextInt(10);//0-9
            //         break;
            // }
            //只需要纯数字验证码
            code += r.nextInt(10);//0-9
        }
        return code;
    }




}
