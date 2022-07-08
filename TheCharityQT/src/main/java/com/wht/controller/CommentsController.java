package com.wht.controller;

import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Comments;
import com.wht.domain.vo.CommentVo;
import com.wht.domain.vo.pageVo;
import com.wht.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("comments")
public class CommentsController {

    @Autowired
    CommentsService commentsServiceImpl;


    /***
     * 获取评论
     * @return
     */
    @RequestMapping("getComments")
    public ResponseEntity<pageVo<CommentVo>> getComments(@RequestParam("newsId") Long newsId,
                                                         @RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum,
                                                         @RequestParam(value = "pageSize",defaultValue = "3") Integer pageSize){
        return commentsServiceImpl.getComments(pageNum,pageSize,newsId);
    }

    /***
     * 发送评论
     * @param comments
     * @return
     */
    @PostMapping("sendComment")
    public ResponseEntity sendComment(Comments comments){
        return commentsServiceImpl.sendComment(comments);
    }

}
