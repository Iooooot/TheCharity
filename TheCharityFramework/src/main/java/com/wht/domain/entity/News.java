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
 * 新闻资讯表(News)表实体类
 *
 * @author makejava
 * @since 2022-04-20 10:29:28
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("news")
public class News  {
    //资讯id
    @TableId
    private Long id;

    //资讯标题
    private String title;
    //资讯内容
    private String content;
    //资讯摘要
    private String summary;
    //资讯分类(1普通新闻2热点聚焦3公益头条4今日要闻)
    private String type;
    //发布作者
    private String author;
    //发布时间
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    //评论数
    private Integer commentsNumber;
    //资讯展示大图路径
    private String bigpic;
    //删除标志(0表示未删除1表示删除)
    private Integer delFlag;

}
