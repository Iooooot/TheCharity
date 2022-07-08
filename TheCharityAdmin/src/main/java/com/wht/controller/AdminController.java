package com.wht.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.User;
import com.wht.service.UserService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("user")
public class AdminController {

    @Autowired
    UserService userServiceImpl;

    /***
     * 管理员登录
     * @param username
     * @param password
     * @param httpSession
     * @return
     */
    @PostMapping("adminLogin")
    public ResponseEntity<User> adminLogin(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession httpSession){
        ResponseEntity<User> responseEntity = null;
        if(username.equals("")  || password.equals("")){
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_LOGIN_INCOMPLETE_INFORMATION);
        }else{
            //调用service验证账号密码查找出user对象
            User user = userServiceImpl.adminLogin(username,password);
            if(user != null){
                //登录成功
                //存入session并响应数据
                httpSession.setAttribute(TheCharityConst.ATTR_NAME_LOGIN_ADMIN, user);
                responseEntity = ResponseEntity.successWithData(user);
            }else{
                //登录失败
                responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_LOGIN_FAILED);
            }
        }
        return responseEntity;
    }

    /***
     * 管理员找回密码
     * @param username
     * @param id
     * @return
     */
    @PostMapping("adminFindPwd")
    public ResponseEntity<String> adminFindPwd(@RequestParam("username") String username,@RequestParam("id")Long id){
        return userServiceImpl.adminFindPwd(username,id);
    }

    /***
     * 管理员注销
     * @return
     */
    @GetMapping("adminLogout")
    public ResponseEntity adminLogout(HttpSession session, HttpServletRequest request){
        ResponseEntity responseEntity = null;
        //销毁session
        session.invalidate();
        if(request.getSession(false)!=null){
            //说明退出失败
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }else{
            responseEntity = ResponseEntity.successWithoutData();
        }
        return responseEntity;
    }

    @GetMapping("getUsersNum")
    public ResponseEntity<Integer> getUsersNum(){
        ResponseEntity<Integer> responseEntity = null;
        int count = userServiceImpl.count(new LambdaQueryWrapper<User>().eq(User::getType, TheCharityConst.ATTR_NAME_COMMON_USER));
        if(count >= 0){
            responseEntity = ResponseEntity.successWithData(count);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

}
