package com.wht.domain.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * 志愿者专业技能表(Skill)表实体类
 *
 * @author makejava
 * @since 2022-04-23 20:52:27
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("skill")
public class Skill  {
    //专业技能id
    @TableId
    private Long id;

    //专业技能名
    private String skillName;
    //技能描述
    private String description;
    //删除标志(0表示未删除1表示删除)
    private Integer delFlag;

}
