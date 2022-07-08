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
 * 资讯评论表(Comments)表实体类
 *
 * @author makejava
 * @since 2022-04-20 16:44:10
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("comments")
public class Comments  {
    //评论id
    @TableId
    private Long id;

    //评论的资讯id
    private Long newsId;
    //根评论id
    private Long rootId;
    //评论内容
    private String content;
    //所回复评论的userid
    private Long toCommentUserId;
    //所回复的评论id
    private Long toCommentId;
    //评论时间
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    //评论发起的用户id
    private Long createBy;
    @TableField(exist = false)
    private String createByName;
    //删除标志(0表示未删除1表示删除)
    private Integer delFlag;



}
