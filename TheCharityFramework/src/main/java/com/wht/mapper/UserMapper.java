package com.wht.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wht.domain.entity.User;
import org.springframework.stereotype.Repository;


/**
 * 用户、管理员表(User)表数据库访问层
 *
 * @author makejava
 * @since 2022-04-14 21:17:13
 */
@Repository
public interface UserMapper extends BaseMapper<User> {
    //求捐助总和
    Double getAccountSum(Long id);
    //根据id求用户名
    String getNameById(Long userId);
}

