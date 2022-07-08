$(function () {
    //展示个人信息
    showPersonInfo();
    //查询总捐助金额
    getDoAccount();

})

function showPersonInfo() {
    //从缓存中取
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    //一一展示
    console.log(user);
    $("#personInfo").text(user.personalIntroduction);
    $("#e-personInfo").val(user.personalIntroduction);
    $("#nick_name").text(user.nickName);
    $("#e-name").val(user.nickName);
    $("#sex").text(user.sex == 1  ? '男' : '女');
    $("#e-Sex").val(user.sex == 1  ? '男' : '女');
    $("#create_time").text(user.createTime);
    $("#address").text(user.address);
    $("#e-address").val(user.address);
    $("#occupation").text(user.occupation);
    $("#e-occupation").val(user.occupation);
    $("#email").text(user.email);
    $("#e-email").val(user.email);
    $("#mobile").text(user.phoneNumber);
    $("#e-mobile").val(user.phoneNumber);

}

function getDoAccount() {
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    let url = BASE_URL + "/user/getDoAccount"
    let args = {"id":user.id};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //展示金额
            $("#doAmount").text(responseEntity.data+"  ¥");
        }else{
            layer.msg(responseEntity.message);
        }
    })

}

function updateUserInfo() {
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    //获取用户输入
    let personInfo  = $("#e-personInfo").val();
    let name =  $("#e-name").val();
    let sex = $("#e-Sex").val();
    if(sex === '男'){
        sex = 1;
    }else if(sex === '女'){
        sex = 0;
    }else{
        layer.msg("性别输入有误！只能输入男/女");
        return;
    }
    let address = $("#e-address").val();
    let occupation =  $("#e-occupation").val();
    let email = $("#e-email").val();
    let mobile = $("#e-mobile").val();
    if(personInfo===""||personInfo===null||name===""||name===null||sex===""||sex===null
        ||address===""||address===null||occupation===""||occupation===null||email===""||email===null||mobile===""||mobile===null){
        layer.msg("请将需要更改的信息填写完整！！");
    }else{
        //发送异步请求
        let url = BASE_URL + "/user/updateUser"
        let args = {"id":user.id,"nickName":name,"sex":sex,"address":address,"occupation":occupation,
            "personalIntroduction":personInfo,"phoneNumber":mobile,"email":email};
        $.post(url,args,function (responseEntity) {
            if(responseEntity.result === "SUCCESS"){
                //更新缓存
                sessionStorage.removeItem("loginUser");
                sessionStorage.setItem("loginUser",JSON.stringify(responseEntity.data));
                //修改成功
                location.href = "profile.html";
            }else{
                //修改失败
                layer.msg(responseEntity.message);
            }
        })
    }
}