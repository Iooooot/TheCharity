package com.wht.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.User;


/**
 * 用户、管理员表(User)表服务接口
 *
 * @author makejava
 * @since 2022-04-14 21:17:15
 */
public interface UserService extends IService<User> {
    //用户登录
    User userLogin(String username, String password);
    //用户注册
    ResponseEntity userRegister(User user);
    //邮箱验证码发送
    ResponseEntity<String> sendCheckCode(String email);
    //找回密码
    ResponseEntity<String> findPwd(String username, String email);
    //求捐助总和
    ResponseEntity<Double> getDoAccount(Long id);
    //管理员登录
    User adminLogin(String username, String password);
    //管理员找回密码
    ResponseEntity<String> adminFindPwd(String username, Long id);
}
