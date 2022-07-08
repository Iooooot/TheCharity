$(function () {
    //获取id
    window.newsId = getParameter("newsId");
    //当前评论页数
    window.pageNum = 1;
    //当前一页展示评论个数
    window.pageSize = 3;
    //根据id查询项目
    let url = BASE_URL + "/news/getNewsById";
    let args = {"id":newsId};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //展示
            showNews(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })

    //查询评论
    getComments();
})
//展示相关资讯
function showNews(news) {
    $("#newsTitle").text(news.title);
    $("#newsContent").text(news.content);
    $("#newsImg").attr("src",news.bigpic);
    $("#commentNum").text(news.commentsNumber);
}
//查询评论
function getComments() {
    //查询评论
    let url = BASE_URL + "/comments/getComments";
    let args = {"newsId":newsId,"pageNum":pageNum,"pageSize":pageSize};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取一个评论的分页对象(包含根评论以及根评论的子评论)
            //展示
            showComments(responseEntity.data);
            $("#commentNum").text(responseEntity.data.total);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//点击回复展示评论框
function showCollapse(rootId,toCommentId,toCommentUserId,obj) {
    let len = $("#comment-list").find("form").length;
    if(len === 0){
        let html = "<form action=\"#\" class=\"p-2 bg-light\" id='replyForm'>\n" +
            "                              <div class=\"form-group\">\n" +
            "                                  <label for=\"childComment\">评论</label>\n" +
            "                                  <textarea name=\"\" placeholder=\"blablabla......\" id='childComment' cols=\"10\" rows=\"2\" class=\"form-control\"></textarea>\n" +
            "                              </div>\n" +
            "                              <div class=\"form-group\">\n" +
            "                                  <input type=\"button\" onclick='sendChildComment("+rootId+","+toCommentId+","+toCommentUserId+")' style=\"font-size: 1px;\" value=\"回复评论\" class=\"btn orange-border\">\n" +
            "                              </div>\n" +
            "                          </form>";
        $(obj).after(html);
    }else{
        $("#replyForm").remove();
    }
    return false;
}
//展示评论
function showComments(commentsPage) {
    //首先清空页面静态评论
    $("#comment-list").empty();
    let html = "";
    //判断该资讯是否有评论
    if(commentsPage.total > 0){
        //展示评论
        for (let i = 0; i < commentsPage.records.length; i++) {
            //先展示根评论
            html += "<li class=\"comment\">\n" +
                "                            <div class=\"vcard bio\">\n" +
                "                                <img src=\""+commentsPage.records[i].avatar+"\" alt=\"Image placeholder\">\n" +
                "                            </div>\n" +
                "                            <div class=\"comment-body\">\n" +
                "                                <h3>"+commentsPage.records[i].username+"</h3>\n" +
                "                                <div class=\"meta\">"+commentsPage.records[i].createTime+"</div>\n" +
                "                                <p>"+commentsPage.records[i].content+"</p>\n" +
                "                                <p><a class=\"reply\" style=\"cursor: pointer\"   onclick=\"showCollapse("+commentsPage.records[i].id+","+commentsPage.records[i].id+","+commentsPage.records[i].createBy+",this)\">回复</a></p>\n" +
                "                            </div>";
            if(commentsPage.records[i].children.length > 0){
                html += "<ul class=\"children\">";
            }
            //展示子评论
            for (let j = 0; j < commentsPage.records[i].children.length; j++) {
                html += "<li class=\"comment\">\n" +
                    "                                    <div class=\"vcard bio\">\n" +
                    "                                        <img src=\""+commentsPage.records[i].children[j].avatar+"\" alt=\"Image placeholder\">\n" +
                    "                                    </div>\n" +
                    "                                    <div class=\"comment-body\">\n" +
                    "                                        <h3><span>"+commentsPage.records[i].children[j].username+"</span>&nbsp;&nbsp;回复了&nbsp;&nbsp;<span>"+commentsPage.records[i].children[j].toCommentUserName+"</span></h3>\n" +
                    "                                        <div class=\"meta\">"+commentsPage.records[i].children[j].createTime+"</div>\n" +
                    "                                        <p>"+commentsPage.records[i].children[j].content+"</p>\n" +
                    "                                        <p><a class=\"reply\" style=\"cursor: pointer\"   onclick=\"showCollapse("+commentsPage.records[i].children[j].rootId+","+commentsPage.records[i].children[j].id+","+commentsPage.records[i].children[j].createBy+",this)\">回复</a></p>\n" +
                    "                                    </div>\n" +
                    "                                </li>";
            }
            if(commentsPage.records[i].children.length > 0){
                html += "</ul>";
            }
            html += "</li>";
        }
        $("#comment-list").append(html);
        html = "";
        //生成页码导航
        $("#commentPagination").empty();
        //第一页永远存在
        if(commentsPage.current === "1"){
            html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">01</a></li>";
        }else{
            html += "<li><a style='cursor: pointer' onclick='changePage(1)'>01</a></li>";
        }
        //生成中间页面
        let begin;//开始位置
        let end;//结束
        //1.显示10个页码
        if(commentsPage.pages < 10){
            //总页码不够10页
            begin=2;
            end=commentsPage.pages-1;
        }else{
            //超过10页
            begin=commentsPage.current-4;
            end=commentsPage.current+3;
            //如果前边不够4个后面补齐
            if(begin<1){
                begin=2;
                end=begin+8;
            }
            //后边不够3个前面补齐
            if(end>commentsPage.pages - 1){
                end=commentsPage.pages-1;
                begin=end-7;
                html += "<li><a>.......</a></li>"
            }
        }
        for (let i=begin;i<=end;i++){
            if((i+"") === commentsPage.current){
                html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">"+formatPageNum(i)+"</a></li>";
            }else{
                html += "<li><a style='cursor: pointer' onclick='changePage("+i+")'>"+formatPageNum(i)+"</a></li>";
            }
        }
        if(commentsPage.pages > 10 && end <= 10){
            html += "<li><a>.......</a></li>"
        }
        //最后一页永远存在
        if(commentsPage.pages != 1){
            if(commentsPage.current === commentsPage.pages){
                html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">"+formatPageNum(commentsPage.pages)+"</a></li>";
            }else{
                html += "<li><a style='cursor: pointer' onclick='changePage("+commentsPage.pages+")'>"+formatPageNum(commentsPage.pages)+"</a></li>";
            }
        }
        $("#commentPagination").append(html);
    }
}
//跟换页码
function changePage(num) {
    window.pageNum = num;
    getComments();
}
//发送评论
//发送根评论
function sendRootComment() {
    let content = $("#rootComment").val();
    if(content === "" || content == null){
        layer.msg("请勿评论空数据！！");
    }else{
        sendComment(-1,-1,-1,content);
        $("#rootComment").val("");
    }
}
//发送子评论
function sendChildComment(rootId,toCommentId,toCommentUserId) {
    let content = $("#childComment").val();
    if(content === "" || content == null){
        layer.msg("请勿评论空数据！！");
    }else{
        sendComment(rootId,toCommentId,toCommentUserId,content);
    }
}

function sendComment(rootId,toCommentId,toCommentUserId,content) {
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    let url = BASE_URL + "/comments/sendComment";
    let args = {"newsId":window.newsId,"rootId":rootId,"toCommentId":toCommentId,"toCommentUserId":toCommentUserId,"createBy":user.id,"content":content};
    $.post(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //展示
            //如果是根评论就跳转到最后一页
            getComments();
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}