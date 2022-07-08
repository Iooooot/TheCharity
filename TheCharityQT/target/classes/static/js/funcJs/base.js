let BASE_URL = "/TheCharity"
$(function () {
    //检查用户是否登录
    checkIsLogin();
    //给注销绑定点击事件
    $("#div_logout a").click(function () {
        userLogout();
    })
    //展示页脚最新资讯
    showRecentlyNews();
})


function checkIsLogin() {
    //首先检查浏览器是否缓存了用户
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    if(user == null){
        //说明缓存没有再向后端查询
        let url = BASE_URL + "/user/isLogin";
        let args = {};
        $.get(url,args,function (responseEntity) {
            //接收后端返回的统一responseEntity接口
            if(responseEntity.result === "SUCCESS"){
                //表示已经登录
                //显示样式
                showInfo(responseEntity.data);
                //并缓存数据
                sessionStorage.setItem("loginUser",JSON.stringify(responseEntity.data));
            }
        })
    }else{
        //说明有缓存直接显示
        showInfo(user);
    }
}
function showInfo(user) {
    //进行样式的转变
    //隐藏登录、注册按钮
    $("#div_login").attr("style","display:none");
    $("#div_register").attr("style","display:none");
    //展示头像用户名以及注销
    $("#div_userInfo").attr("style", "display:inline");
    //展示头像
    $("#t_img").attr("src",user.avatar);
    //展示用户名
    $("#a_username").text(user.nickName);
    $("#div_logout").attr("style", "display:inline");
}
//用户登出
function userLogout() {

    //发送请求让后端删除session中的对象
    let url = BASE_URL + "/user/userLogout";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result == "SUCCESS"){
            //登出成功
            layer.msg("成功退出！");
            //移除sessionStorage中的user对象
            sessionStorage.removeItem("loginUser");
            //改变样式
            $("#div_login").attr("style","display:inline");
            $("#div_register").attr("style","display:inline");
            $("#div_userInfo").attr("style", "display:none");
            $("#div_logout").attr("style", "display:none");
        }else{
            //退出失败并提示用户
            layer.msg(responseEntity.message);
        }
    })
    return false;
}
//更换头像
function changeAvatar() {
    //弹出文件上传框上传头像
    //用户上传之后会回显路径在隐藏域中
    $("#edit_pIcon").click();
    //监听文件上传的属性改变
    let va = $("#pIcon").val();
    let id = setInterval(function(){
        let iconUrl = $("#pIcon").val();
        if(va !== iconUrl){
            va = iconUrl;
            let user = JSON.parse(sessionStorage.getItem("loginUser"));
            //发送请求修改数据库
            let url = BASE_URL + "/user/changeAvatar";
            let args = {"id":user.id,"avatar":iconUrl};
            alert(args);
            $.post(url,args,function (responseEntity) {
                if(responseEntity.result === "SUCCESS"){
                    //修改头像
                    $("#t_img").attr("src",iconUrl);
                    //修改本地缓存
                    user.avatar = iconUrl;
                    sessionStorage.setItem("loginUser",JSON.stringify(user));
                    layer.msg("头像修改成功");
                }else{
                    //退出失败并提示用户
                    layer.msg(responseEntity.message);
                }
            })
            clearInterval(id);
        }
    },1000)
}
//获取活动筹集百分比
function getPercentage(raised,goal) {
    let sum;
    if(raised !== 0){
        sum = Math.floor(raised / goal * 100);
    }else{
        sum = 0;
    }
    return sum;
}
//根据传递过来的参数name获取对应的值
function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}
//格式化页数
function formatPageNum(num) {
    let n;
    if(num<10){
        n = "0"+num;
    }else{
        n =""+num;
    }
    return n;
}
//展示最新资讯
function showRecentlyNews() {
    let url = BASE_URL + "/news/getRecentlyNews";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //展示
            $("#foot-latest-news").empty();
            let html = "";
            for (let i = 0; i < responseEntity.data.length; i++) {
                html += "<li>\n" +
                    "           <h3><a href=\"single-news.html?newsId="+responseEntity.data[i].id+"\">"+responseEntity.data[i].title+"</a></h3>\n" +
                    "           <div class=\"posted-date\">"+responseEntity.data[i].createTime+"</div>\n" +
                    "    </li>";
            }
            $("#foot-latest-news").append(html);
        }else{
            //退出失败并提示用户
            layer.msg(responseEntity.message);
        }
    })
}