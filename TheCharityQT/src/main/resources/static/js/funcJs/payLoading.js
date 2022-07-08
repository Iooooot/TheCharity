$(function () {
    //首先获取订单号
    let tradeNo = getParameter("out_trade_no");
    //轮询判断是否支付成功
    let cnt = 0;
    let id = setInterval(function () {
        judgePay(tradeNo,id);
        cnt++;
        if(cnt === 80){
            clearInterval(id);
            $("#payMessage").text("不好意思呀！处理超时啦~请重新进行捐助");
        }
    },500);
})
//判断是否支付成功
function judgePay(tradeNo,id) {
    let url = BASE_URL + "/donations/judgePay";
    let args = {"tradeNo":tradeNo};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //支付成功并收到后端返回的donations对象
            //支付成功后根据重新跳转到刚才的慈善页面
            location.href = "single-causes.html?causeId="+responseEntity.data+"&status=1";
        }else{
            //如果没有成功就显示失败并可以让用户回到刚才的地方
            $("#payMessage").text(responseEntity.message);
            let html = "<div class=\"row\">\n" +
                "                <div class=\"col-12 d-flex justify-content-center mt-72\">\n" +
                "                    <a href=\"single-causes.html?causeId="+responseEntity.data+"\" class=\"btn gradient-bg load-more-btn\">回到慈善项目</a>\n" +
                "                </div>\n" +
                "            </div>";
            $("#payMessage").after(html);
            clearInterval(id);
        }
    })
}
