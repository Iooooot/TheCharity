let BASE_URL = "/Admin"
$(function () {
    //展示个人信息
    let admin = JSON.parse(sessionStorage.getItem("loginAdmin"));
    $("#topUsername").text(admin.nickName);
    $("#adminAvatar").attr("src",admin.avatar);
    //展示模态框信息
    $("#adminAvatarBig").attr("src",admin.avatar);
    $("#adminName").text(admin.nickName);
    let workNo = admin.id;
    if(workNo < 10){
        workNo = "00" + workNo;
    }else if(workNo < 100){
        workNo = "0" + workNo;
    }
    $("#adminId").text(workNo);
    $("#adminInfo").text(admin.personalIntroduction);
    $("#adminEmail").text(admin.email);
})
//注销
function adminLogout() {
    //发送请求让后端删除session中的对象
    let url = BASE_URL + "/user/adminLogout";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result == "SUCCESS"){
            //登出成功
            //移除sessionStorage中的user对象
            sessionStorage.removeItem("loginAdmin");
            //跳转到登录页面
            location.href = "login.html";
        }else{
            //退出失败并提示用户
            layer.msg(responseEntity.message);
        }
    })
    return false;
}

function showInfo() {
    $("#infoModal").modal("show");
    return false;
}

//生成分页导航条函数
function generateNavigator(pageInfo) {

    // 获取总记录数
    let totalRecord = pageInfo.total;

    // 声明相关属性
    let properties = {
        //两侧首尾分页条目数
        "num_edge_entries": 3,
        //连续分页主体部分分页条目数
        "num_display_entries": 5,
        "callback": paginationCallBack,
        "items_per_page": pageInfo.size,
        "current_page": pageInfo.current - 1,
        "prev_text": "« ",
        "next_text": " »"
    }

    // 调用pagination()函数
    $("#Pagination").pagination(totalRecord, properties);
}
//翻页时的回调函数
function paginationCallBack(pageIndex,jQuery) {
    // 修改window对象的pageNum属性
    window.pageNum = pageIndex + 1;

    // 调用分页函数
    generatePage();

    // 取消页码超链接的默认行为
    return false;
}