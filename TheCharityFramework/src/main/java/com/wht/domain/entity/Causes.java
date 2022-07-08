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
 * 慈善项目表(Causes)表实体类
 *
 * @author makejava
 * @since 2022-04-18 20:41:13
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("causes")
public class Causes  {
    //项目id
    @TableId
    private Long id;

    //项目标题
    private String title;
    //项目摘要
    private String summary;
    //项目发布者
    private String author;
    //项目任务目标
    private String task;
    //项目背景
    private String background;
    //已筹集资金
    private Integer raised;
    //目标资金
    private Integer goal;
    //项目分类(1普通公益2特色公益3热门活动)
    private String type;
    //项目展示大图路径
    private String bigpic;
    //项目展示小图路径
    private String smallpic;
    //项目发布时间
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;
    //删除标志(0表示未删除1表示已删除)
    private Integer delFlag;



}
