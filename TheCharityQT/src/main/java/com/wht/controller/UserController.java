package com.wht.controller;

import com.wht.annotation.SystemLog;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.User;
import com.wht.service.UserService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userServiceImpl;

    //判断用户是否登录
    @GetMapping("/isLogin")
    public ResponseEntity<User> isLogin(HttpSession session){
        ResponseEntity<User> responseEntity = null;
        //从session中获取user
        User user = (User)session.getAttribute(TheCharityConst.ATTR_NAME_LOGIN_USER);
        if(user != null){
            //已经登录直接响应成功和用户对象
            responseEntity = ResponseEntity.successWithData(user);
        }else{
            //未登录
            //响应失败，说明原因
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_ACCESS_FORBIDEN);
        }
        return responseEntity;
    }

    //用户登录
    @PostMapping("/userLogin")
    public ResponseEntity<User> userLogin(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession httpSession){
        ResponseEntity<User> responseEntity = null;
        if(username.equals("")  || password.equals("")){
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_LOGIN_INCOMPLETE_INFORMATION);
        }else{
            //调用service验证账号密码查找出user对象
            User user = userServiceImpl.userLogin(username,password);
            if(user != null){
                //登录成功
                //存入session并响应数据
                httpSession.setAttribute(TheCharityConst.ATTR_NAME_LOGIN_USER, user);
                responseEntity = ResponseEntity.successWithData(user);
            }else{
                //登录失败
                responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_LOGIN_FAILED);
            }
        }
        return responseEntity;
    }
    //用户登出
    @GetMapping("/userLogout")
    public ResponseEntity userLogout(HttpSession session, HttpServletRequest request){
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

    //发送验证码给邮箱
    @PostMapping("/sendCheckCode")
    public ResponseEntity<String> sendCheckCode(String email){
        return userServiceImpl.sendCheckCode(email);
    }

    //注册用户
    @PostMapping("/register")
    public ResponseEntity register(User user){
        //直接调用service的注册方法
        return userServiceImpl.userRegister(user);
    }

    //找回密码
    @PostMapping("/findPwd")
    public ResponseEntity<String> findPwd(String username,String email){
        //直接调用service的方法
        return userServiceImpl.findPwd(username,email);
    }

    @PostMapping("/changeAvatar")
    public ResponseEntity changeAvatar(User user){
        ResponseEntity responseEntity = null;
        //直接调用service的方法
        boolean flag = userServiceImpl.updateById(user);
        if(flag){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @PostMapping("/updateUser")
    @SystemLog(businessName = "更新用户个人信息")
    public ResponseEntity<User> updateUser(User user){
        ResponseEntity responseEntity = null;
        //直接调用service的方法
        boolean flag = userServiceImpl.updateById(user);
        if(flag){
            responseEntity = ResponseEntity.successWithData(userServiceImpl.getById(user.getId()));
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @GetMapping("getDoAccount")
    public ResponseEntity<Double> getDoAccount(@RequestParam("id")Long id){
        return userServiceImpl.getDoAccount(id);
    }
}
