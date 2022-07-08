$(function () {
    //后端会用过滤器进行拦截未登录的用户
    //进来后一定已经登录了并且sessionStorage中有user对象
    //获取id
    window.causeId = getParameter("causeId");
    let status = getParameter("status");
    if(status === "1"){
        layer.msg("捐助成功~");
    }
    //根据id查询项目
    let url = BASE_URL + "/causes/getCauseById";
    let args = {"id":causeId};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //展示
            showCause(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })

    //展示捐助者信息
    showDonorInfo();

})
//进行页面渲染
function showCause(cause) {
    $("#entry-title").text(cause.title);
    $("#entry-content").text("    "+cause.background);
    $("#causePercentage").attr("data-percentage",getPercentage(cause.raised,cause.goal));
    $("#fund-raised").barfiller();
    window.raised = cause.raised;
    $("#causeRaised").text(cause.raised);
    window.goal = cause.goal;
    $("#causeGoal").text(cause.goal);
    $("#causeImg").attr("src",cause.bigpic);
    $("#causeSummary").text(cause.summary);
    $("#causeTask").text(cause.task);
}
function showDonorInfo() {
    //因为登录了所以缓存中一定有
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    //展示信息
    $("#nickName").val(user.nickName);
    $("#donorAddress").val(user.address);
    $("#donorEmail").val(user.email);
}
//确定捐助
function makeDonation() {
    //获取信息
    let nickName = $("#nickName").val();
    let donorAddress = $("#donorAddress").val();
    let donorEmail = $("#donorEmail").val();
    let donationAmount = $("input[name='donation_amount']:checked").val();
    let donorMessage = $("#donorMessage").val();
    if(nickName === "" || nickName == null || donorAddress === "" || donorAddress == null || donorEmail === "" || donorEmail == null){
        layer.msg("请在捐助之前输入完整的信息哦~");
    }else{
        //判断是否金额已经超过目标了
        if(Number.parseInt(donationAmount) + window.raised > window.goal){
            layer.msg("亲~您捐助的金额已经超过我们需要的目标啦~可以减少金额哦~");
        }else{
            //获取捐助者id
            let user = JSON.parse(sessionStorage.getItem("loginUser"));
            let url = BASE_URL + "/donations/makeDonation";
            let args = {"userId":user.id,"causeId":window.causeId,"amount":donationAmount,"message":donorMessage};
            //跳转支付宝页面
            $.post(url,args,function (responseEntity) {
                if(responseEntity.result === "SUCCESS"){
                    //获取了支付地址
                    //进行跳转
                    window.open(responseEntity.data);
                }else{
                    //提示用户错误信息
                    layer.msg(responseEntity.message);
                }
            })
        }
    }
}