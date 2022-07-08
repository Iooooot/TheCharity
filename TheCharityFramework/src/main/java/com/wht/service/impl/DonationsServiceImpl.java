package com.wht.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Donations;
import com.wht.domain.entity.User;
import com.wht.mapper.DonationsMapper;
import com.wht.mapper.UserMapper;
import com.wht.service.DonationsService;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 捐助情况表(Donations)表服务实现类
 *
 * @author makejava
 * @since 2022-04-22 15:04:28
 */
@Service("donationsService")
public class DonationsServiceImpl extends ServiceImpl<DonationsMapper, Donations> implements DonationsService {
    @Autowired
    UserMapper userMapper;

    @Override
    public ResponseEntity<String> judgePay(String tradeNo) {
        ResponseEntity<String> responseEntity = null;
        Donations donations = getOne(new LambdaQueryWrapper<Donations>().eq(Donations::getTradeNo, tradeNo));
        if(donations.getStatus().equals("1")){
            //支付成功
            responseEntity = ResponseEntity.successWithData(String.valueOf(donations.getCauseId()));
        }else{
            responseEntity = new ResponseEntity<>("FAILED", TheCharityConst.MESSAGE_PAY_ERROR, String.valueOf(donations.getCauseId()));
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Page<Donations>> getDonationsPage(Integer pageNum, Integer pageSize, String keyword) {
        ResponseEntity<Page<Donations>> responseEntity = null;
        //进行分页查询
        Page<Donations> donationsPage = null;
        //首先看是否是根据捐助者名查询
        if(keyword != null && !"".equals(keyword)){
            User user = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getNickName, keyword));
            if(user != null){
                donationsPage = page(new Page<Donations>(pageNum, pageSize),new LambdaQueryWrapper<Donations>().eq(Donations::getUserId,user.getId()));
            }else{
                //不是再根据金额，留言，捐助时间查询
                donationsPage = page(new Page<Donations>(pageNum, pageSize),new LambdaQueryWrapper<Donations>().like(Donations::getAmount,keyword).
                        or().like(Donations::getMessage,keyword).or().like(Donations::getCreateTime,keyword));
            }
        }else{
            donationsPage = page(new Page<Donations>(pageNum, pageSize));
        }

        //查询出捐助者名字
        List<Donations> records = donationsPage.getRecords();
        for (Donations record : records) {
            String name = userMapper.getNameById(record.getUserId());
            record.setUsername(name);
        }
        donationsPage.setRecords(records);
        if(donationsPage != null){
            responseEntity = ResponseEntity.successWithData(donationsPage);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }
}
