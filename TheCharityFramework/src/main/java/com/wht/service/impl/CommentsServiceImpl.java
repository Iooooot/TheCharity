package com.wht.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wht.domain.ResponseEntity;
import com.wht.domain.entity.Comments;
import com.wht.domain.entity.News;
import com.wht.domain.entity.User;
import com.wht.domain.vo.CommentVo;
import com.wht.domain.vo.pageVo;
import com.wht.mapper.CommentsMapper;
import com.wht.service.CommentsService;
import com.wht.service.NewsService;
import com.wht.service.UserService;
import com.wht.utils.BeanCopyUtils;
import com.wht.utils.TheCharityConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 资讯评论表(Comments)表服务实现类
 *
 * @author makejava
 * @since 2022-04-20 16:44:11
 */
@Service("commentsService")
public class CommentsServiceImpl extends ServiceImpl<CommentsMapper, Comments> implements CommentsService {

    @Autowired
    UserService userServiceImpl;

    @Autowired
    NewsService newsServiceImpl;



    @Override
    public ResponseEntity<pageVo<CommentVo>> getComments(Integer pageNum, Integer pageSize, Long newsId) {
        ResponseEntity<pageVo<CommentVo>> responseEntity = null;
        //首先查询出所有根评论
        Page<Comments> rootComments = page(new Page<Comments>(pageNum, pageSize),
                new LambdaQueryWrapper<Comments>().eq(Comments::getRootId, TheCharityConst.ATTR_NAME_ROOT_COMMENT)
                        .and(i -> i.eq(Comments::getNewsId,newsId)));
        if(rootComments == null){
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }else{
            //创建前端需要的分页对象
            pageVo<CommentVo> pageVo = new pageVo<>();
            pageVo.setCurrent(pageNum);
            pageVo.setSize(pageSize);
            pageVo.setPages(rootComments.getPages());
            pageVo.setTotal(rootComments.getTotal());
            //先转换为vo对象
            List<CommentVo> commentVoList = BeanCopyUtils.copyBeanList(rootComments.getRecords(), CommentVo.class);
            //完善vo对象（设置相关的姓名）
            commentVoList = fullFillCommentVo(commentVoList);
            //查询子评论
            for (CommentVo commentVo : commentVoList) {
                //根据根评论id查询
                List<Comments> childComments = list(new LambdaQueryWrapper<Comments>().eq(Comments::getRootId, commentVo.getId()).orderByDesc(Comments::getCreateTime));
                List<CommentVo> childCommentsVo = BeanCopyUtils.copyBeanList(childComments, CommentVo.class);
                //完善子评论的信息
                childCommentsVo = fullFillCommentVo(childCommentsVo);
                commentVo.setChildren(childCommentsVo);
            }
            if(commentVoList == null){
                responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
            }else{
                pageVo.setRecords(commentVoList);
                responseEntity = ResponseEntity.successWithData(pageVo);
            }
        }

        return responseEntity;
    }

    @Override
    public ResponseEntity sendComment(Comments comments) {
        ResponseEntity responseEntity = null;
        //保存评论
        boolean flag = save(comments);
        boolean flag2 = true;
        //只有根评论才算
        if(Long.compare(comments.getRootId(),TheCharityConst.ATTR_NAME_ROOT_COMMENT) == 0){
            News news = newsServiceImpl.getById(comments.getNewsId());
            news.setCommentsNumber(news.getCommentsNumber()+1);
            //增加资讯的评论数
            flag2 = newsServiceImpl.update(news, new LambdaUpdateWrapper<News>().eq(News::getId, news.getId()));
        }
        if(flag && flag2){
            responseEntity = ResponseEntity.successWithoutData();
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    @Override
    public ResponseEntity<Page<Comments>> getCommentsPage(Integer pageNum, Integer pageSize, String keyword) {
        ResponseEntity<Page<Comments>> responseEntity = null;
        Page<Comments> commentsPage = null;
        //分页查询
        //如果有查询条件
        if(!"".equals(keyword)){
            //是否按照评论人查询
            User user = userServiceImpl.getOne(new LambdaQueryWrapper<User>().eq(User::getNickName, keyword));
            if(user != null){
                commentsPage = page(new Page<Comments>(pageNum, pageSize),new LambdaQueryWrapper<Comments>().eq(Comments::getCreateBy,user.getId()));
            }else{
                //不是再根据评论内容、评论时间查询
                commentsPage = page(new Page<Comments>(pageNum, pageSize),new LambdaQueryWrapper<Comments>().like(Comments::getContent,keyword).
                        or().like(Comments::getCreateTime,keyword));
            }
        }else{
            commentsPage = page(new Page<Comments>(pageNum, pageSize));
        }
        //查出发布者名字
        List<Comments> records = commentsPage.getRecords();
        for (Comments record : records) {
            User user = userServiceImpl.getById(record.getCreateBy());
            record.setCreateByName(user.getNickName());
        }
        commentsPage.setRecords(records);
        //返回结果
        if(commentsPage != null){
            responseEntity = ResponseEntity.successWithData(commentsPage);
        }else{
            responseEntity = ResponseEntity.failed(TheCharityConst.MESSAGE_SYSTEM_ERROR);
        }
        return responseEntity;
    }

    //完善评论信息
    private List<CommentVo> fullFillCommentVo(List<CommentVo> commentVoList) {
        for (CommentVo commentVo : commentVoList) {
            //查询出每个评论的发布者名
            User user = userServiceImpl.getById(commentVo.getCreateBy());
            commentVo.setUsername(user.getNickName());
            commentVo.setAvatar(user.getAvatar());
            //如果不是根评论
            if(Long.compare(commentVo.getRootId(),TheCharityConst.ATTR_NAME_ROOT_COMMENT) != 0){
                //查询出每个评论的回复评论的发布者名
                commentVo.setToCommentUserName(userServiceImpl.getById(commentVo.getToCommentUserId()).getNickName());
            }
        }
        return commentVoList;
    }


}
