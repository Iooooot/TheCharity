package com.wht.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.User;
import com.wht.mapper.UserMapper;
import com.wht.service.UserService;
import com.wht.utils.MailUtils;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * 用户、管理员表(User)表服务实现类
 *
 * @author makejava
 * @since 2022-04-14 21:17:15
 */
@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    UserMapper userMapper;

    /***
     * 用户登录
     * @param username
     * @param password
     * @return
     */
    @Override
    public User userLogin(String username, String password) {
        //根据username查询出user
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserName,username);
        User user = getOne(queryWrapper);
        if(user != null){
            //用户名存在
            //对比密码是否正确
            if(Objects.equals(user.getPassword(),password) && user.getType().equals(TheCharityConst.ATTR_NAME_COMMON_USER)){
                //账号密码正确
                return user;
            }
        }
        return null;
    }

    /***
     * 用户注册
     * @param user
     * @return
     */
    @Override
    public ResponseEntity userRegister(User user) {
        ResponseEntity responseEntity = null;
        //首先查看用户名是否有人使用
        //根据用户名查询用户
        User one = getOne(new LambdaQueryWrapper<User>().eq(User::getUserName, user.getUserName()));
        if(one != null){
            //表示用户名已经存在
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_USERNAME_NOT_EXIST);
        }else{
            //用户名不存在直接插入user
            boolean flag = save(user);
            if(flag){
                //添加成功
                responseEntity = ResponseEntity.successWithoutData();
            }else{
                //添加失败
                responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
            }
        }
        return responseEntity;
    }

    /***
     * 邮件发送
     * @param email
     * @return
     */
    @Override
    public ResponseEntity<String> sendCheckCode(String email) {
        ResponseEntity<String> responseEntity = null;
        //生成5位随机验证码和邮件内容
        String checkCode =MailUtils.creatCode(5);
        String content = "<br/><br/>您申请的验证码为: "+checkCode +"<br/><br/>如果你没有请求此代码，可放心忽略这封电子邮件。<br/><br/>别人可能错误地键入了你的电子邮件地址。";
        //发送邮件
        boolean flag = MailUtils.sendMail(email, content, "TheCharity");
        if(flag){
            //发送成功
            //返回验证码
            responseEntity = ResponseEntity.successWithData(checkCode);
        }else{
            //发送失败
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    /***
     * 密码找回
     * @param username
     * @param email
     * @return
     */
    @Override
    public ResponseEntity<String> findPwd(String username, String email) {
        ResponseEntity<String> responseEntity = null;
        //根据用户名查询用户是否存在
        User one = getOne(new LambdaQueryWrapper<User>().eq(User::getUserName, username));
        if(one != null){
            //再判断邮箱是否和用户一致
            if(Objects.equals(email, one.getEmail())){
                //若一致再返回带密码的响应接口
                responseEntity = ResponseEntity.successWithData(one.getPassword());
            }else{
                //不一致
                responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_EMAIL_MISMATCH);
            }
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_USERNAME_NOT_EXIST);
        }
        return responseEntity;
    }

    /***
     * 求捐助总和
     * @param id
     * @return
     */
    @Override
    public ResponseEntity<Double> getDoAccount(Long id) {
        ResponseEntity<Double> responseEntity = null;
        Double sum = userMapper.getAccountSum(id);
        if(sum < 0){
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }else{
            responseEntity = ResponseEntity.successWithData(sum);
        }
        return responseEntity;
    }

    /***
     * 管理员登录
     * @param username
     * @param password
     * @return
     */
    @Override
    public User adminLogin(String username, String password) {
        //根据username查询出user
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserName,username);
        User user = getOne(queryWrapper);
        if(user != null){
            //用户名存在
            //对比密码是否正确
            if(Objects.equals(user.getPassword(),password) && user.getType().equals(TheCharityConst.ATTR_NAME_COMMON_ADMIN)){
                //账号密码正确
                return user;
            }
        }
        return null;
    }

    /***
     * 管理员找回密码
     * @param username
     * @param id
     * @return
     */
    @Override
    public ResponseEntity<String> adminFindPwd(String username, Long id) {
        ResponseEntity<String> responseEntity = null;
        //根据id查询出用户
        User admin = getById(id);

        if(admin != null){
            //判断是否和用户名对应
            if(admin.getUserName().equals(username) && admin.getType().equals(TheCharityConst.ATTR_NAME_COMMON_ADMIN)){
                //信息正确
                responseEntity = ResponseEntity.successWithData(admin.getPassword());
            }else{
                responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_FINDPWD_FAILED);
            }
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_WORKNO_NOT_EXIST);
        }
        return responseEntity;
    }
}
