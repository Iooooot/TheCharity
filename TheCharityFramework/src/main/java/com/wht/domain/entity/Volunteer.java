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
 * 志愿者表(Volunteer)表实体类
 *
 * @author makejava
 * @since 2022-04-19 11:04:42
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("volunteer")
public class Volunteer  {
    //志愿者id
    @TableId
    private Long id;

    //志愿者真实名字
    private String name;
    //家庭住址
    private String address;
    //性别
    private String sex;
    //年龄
    private Integer age;
    //邮箱
    private String email;
    //手机号
    private String phoneNumber;
    //专业技能id
    private Long skillId;
    //技能名称
    @TableField(exist = false)
    private String skill;
    //加入志愿者时间
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    //删除标志(0表示未删除1表示删除)
    private Integer delFlag;



}
