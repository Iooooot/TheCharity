package com.wht.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentVo {
    private Long id;
    //资讯id
    private Long newsId;
    //根评论id
    private Long rootId;
    //评论内容
    private String content;
    //所回复的目标评论的userid
    private Long toCommentUserId;
    //所回复的目标评论的用户名
    private String toCommentUserName;
    //回复目标评论id
    private Long toCommentId;
    //评论发布者id
    private Long createBy;
    //评论发布者名
    private String username;
    //评论发布者头像路径
    private String avatar;
    //评论发布时间
    private LocalDateTime createTime;
    //子评论
    private List<CommentVo> children;

}
