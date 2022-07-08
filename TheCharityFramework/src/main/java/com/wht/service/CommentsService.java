package com.wht.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Comments;
import com.wht.domain.vo.CommentVo;
import com.wht.domain.vo.pageVo;


/**
 * 资讯评论表(Comments)表服务接口
 *
 * @author makejava
 * @since 2022-04-20 16:44:11
 */
public interface CommentsService extends IService<Comments> {
    //分页查询评论
    ResponseEntity<pageVo<CommentVo>> getComments(Integer pageNum, Integer pageSize, Long newsId);
    //保存评论
    ResponseEntity sendComment(Comments comments);
    //分页查询所有评论
    ResponseEntity<Page<Comments>> getCommentsPage(Integer pageNum, Integer pageSize, String keyword);
}
