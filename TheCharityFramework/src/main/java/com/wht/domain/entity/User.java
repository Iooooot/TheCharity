package com.wht.domain.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 用户、管理员表(User)表实体类
 *
 * @author makejava
 * @since 2022-04-14 21:17:14
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user")
public class User  {
    //用户id
    @TableId
    private Long id;

    //用户名
    private String userName;
    //密码
    private String password;
    //0表示普通用户，1表示管理员
    private String type;
    //真实名称
    private String nickName;
    //性别
    private String sex;
    //住址
    private String address;
    //职业
    private String occupation;
    //自我介绍
    private String personalIntroduction;
    //手机号
    private String phoneNumber;
    //邮箱
    private String email;
    //用户头像
    private String avatar;
    //创建时间让mbp自己填充
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    //删除标志（0表示未删除1表示已删除）
    private Integer delFlag;



}
