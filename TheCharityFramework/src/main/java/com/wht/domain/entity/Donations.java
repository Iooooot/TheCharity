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
 * 捐助情况表(Donations)表实体类
 *
 * @author makejava
 * @since 2022-04-22 15:04:28
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("donations")
public class Donations  {
    //捐助订单id
    @TableId
    private Long id;

    //交易订单号
    private String tradeNo;
    //捐助金额
    private Double amount;
    //捐助者id
    private Long userId;
    //捐助者名字
    @TableField(exist = false)
    private String username;
    //捐助者留言
    private String message;
    //捐助项目id
    private Long causeId;
    //捐助时间
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    //0为未支付1为已支付
    private String status;
    //删除标志(0表示未删除1表示已删除)
    private Integer delFlag;


}
