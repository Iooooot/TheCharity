$(function () {

    //获取近期慈善项目
    if(sessionStorage.getItem("recentlyCauses") === undefined||sessionStorage.getItem("recentlyCauses")==null){
        //没有缓存就查询
        queryRecentlyCauses();
    }else{
        //若不为空将json字符串转为js对象
        let recentlyCauses=JSON.parse(sessionStorage.getItem("recentlyCauses"));
        showRecentlyCauses(recentlyCauses);
    }
    //获取特色公益
    if(sessionStorage.getItem("featureCauses") === undefined||sessionStorage.getItem("featureCauses")==null){
        //没有缓存就查询
        queryFeatureCauses();
    }else{
        //若不为空将json字符串转为js对象
        let featureCauses=JSON.parse(sessionStorage.getItem("featureCauses"));
        showFeatureCauses(featureCauses);
    }

    //获取正在进行的6个慈善项目
    if(sessionStorage.getItem("goingCauses") === undefined||sessionStorage.getItem("goingCauses")==null){
        //没有缓存就查询
        queryGoingCauses();
    }else{
        //若不为空将json字符串转为js对象
        let goingCauses=JSON.parse(sessionStorage.getItem("goingCauses"));
        showGoingCauses(goingCauses);
    }
    //展示已经实现的目标
    showReachedGoal();

})
//获取近期慈善项目
function queryRecentlyCauses() {
    //缓存没有就发请求
    let url = BASE_URL + "/causes/getRecentlyCauses";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //存入sessionStorage
            sessionStorage.setItem("recentlyCauses",JSON.stringify(responseEntity.data));
            //展示
            showRecentlyCauses(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//进行页面展示
function showRecentlyCauses(causesArr) {
    //清空页面
    $("#upcoming-events").empty();
    //渲染页面
    let html = "";
    html += "<div class=\"section-heading\">\n" +
        "    <h2 class=\"entry-title\">近期公益活动</h2>\n" +
        "</div>";
    for (let i = 0; i < causesArr.length;i++){
        html += "<div class=\"event-wrap d-flex flex-wrap justify-content-between\" >\n" +
            "                            <figure class=\"m-0\">\n" +
            "                                <img src=\""+causesArr[i].smallpic+"\" alt=\"\">\n" +
            "                            </figure>\n" +
            "\n" +
            "                            <div class=\"event-content-wrap\">\n" +
            "                                <header class=\"entry-header d-flex flex-wrap align-items-center\">\n" +
            "                                    <h3 class=\"entry-title w-100 m-0\"><a>"+causesArr[i].title+"</a></h3>\n" +
            "\n" +
            "                                    <div class=\"posted-date\">\n" +
            "                                        <a>"+causesArr[i].createTime+"</a>\n" +
            "                                    </div><!-- .posted-date -->\n" +
            "\n" +
            "                                    <div class=\"cats-links\">\n" +
            "                                        <a>"+causesArr[i].author+"</a> \n" +
            "                                    </div><!-- .cats-links -->\n" +
            "                                </header><!-- .entry-header -->\n" +
            "\n" +
            "                                <div class=\"entry-content\">\n" +
            "                                    <p class=\"m-0 hide_text\">"+causesArr[i].summary+"</p>\n" +
            "                                </div><!-- .entry-content -->\n" +
            "\n" +
            "                                <div class=\"entry-footer\">\n" +
            "                                    <a href=\"single-causes.html?causeId="+causesArr[i].id+"\">了解更多</a>\n" +
            "                                </div><!-- .entry-footer -->\n" +
            "                            </div><!-- .event-content-wrap -->\n" +
            "                        </div><!-- .event-wrap -->";
    }
    //写入页面
    $("#upcoming-events").append(html);
}
//查询特色公益
function queryFeatureCauses() {
    //缓存没有就发请求
    let url = BASE_URL + "/causes/getFeatureCauses";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //存入sessionStorage
            sessionStorage.setItem("featureCauses",JSON.stringify(responseEntity.data));
            //展示
            showFeatureCauses(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//展示特色公益
function showFeatureCauses(causesArr) {
    //清空页面
    $("#featured-cause").empty();
    //渲染页面
    let html = "";
    html += "<div class=\"section-heading\">\n" +
        "       <h2 class=\"entry-title\">特色公益</h2>\n" +
        "    </div><!-- .section-heading -->";
    html += "<div class=\"cause-wrap d-flex flex-wrap justify-content-between\">\n" +
        "                            <figure class=\"m-0\">\n" +
        "                                <img src=\""+causesArr[0].bigpic+"\" alt=\"\">\n" +
        "                            </figure>\n" +
        "\n" +
        "                            <div class=\"cause-content-wrap\">\n" +
        "                                <header class=\"entry-header d-flex flex-wrap align-items-center\">\n" +
        "                                    <h3 class=\"entry-title w-100 m-0\"><a>"+causesArr[0].title+"</a></h3>\n" +
        "\n" +
        "                                    <div class=\"posted-date\">\n" +
        "                                        <a>"+causesArr[0].createTime+"</a>\n" +
        "                                    </div><!-- .posted-date -->\n" +
        "\n" +
        "                                    <div class=\"cats-links\">\n" +
        "                                        <a>"+causesArr[0].author+"</a>\n" +
        "                                    </div><!-- .cats-links -->\n" +
        "                                </header><!-- .entry-header -->\n" +
        "\n" +
        "                                <div class=\"entry-content\">\n" +
        "                                    <p class=\"m-0 hide_text\">"+causesArr[0].summary+"</p>\n" +
        "                                </div><!-- .entry-content -->\n" +
        "\n" +
        "                                <div class=\"entry-footer mt-5\">\n" +
        "                                    <a href=\"single-causes.html?causeId="+causesArr[0].id+"#donate\" class=\"btn gradient-bg mr-2\">立刻捐助</a>\n" +
        "                                </div><!-- .entry-footer -->\n" +
        "                            </div><!-- .cause-content-wrap -->\n" +
        "\n" +
        "                            <div class=\"fund-raised w-100\">\n" +
        "                                <div class=\"featured-fund-raised-bar barfiller\">\n" +
        "                                    <div class=\"tipWrap\">\n" +
        "                                        <span class=\"tip\"></span>\n" +
        "                                    </div><!-- .tipWrap -->\n" +
        "\n" +
        "                                    <span class=\"fill\" data-percentage=\""+getPercentage(causesArr[0].raised,causesArr[0].goal)+"\"></span>\n" +
        "                                </div><!-- .fund-raised-bar -->\n" +
        "\n" +
        "                                <div class=\"fund-raised-details d-flex flex-wrap justify-content-between align-items-center\">\n" +
        "                                    <div class=\"fund-raised-total mt-4\">\n" +
        "                                        Raised: ￥"+causesArr[0].raised+"\n" +
        "                                    </div><!-- .fund-raised-total -->\n" +
        "\n" +
        "                                    <div class=\"fund-raised-goal mt-4\">\n" +
        "                                        Goal: ￥"+causesArr[0].goal+"\n" +
        "                                    </div><!-- .fund-raised-goal -->\n" +
        "                                </div><!-- .fund-raised-details -->\n" +
        "                            </div><!-- .fund-raised -->\n" +
        "                        </div><!-- .cause-wrap -->";
    //写入页面
    $("#featured-cause").append(html);

}
//查询正在进行的公益
function queryGoingCauses() {
    //缓存没有就发请求
    let url = BASE_URL + "/causes/getGoingCauses";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //存入sessionStorage
            sessionStorage.setItem("goingCauses",JSON.stringify(responseEntity.data));
            //展示
            showGoingCauses(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//展示正在进行的项目
function showGoingCauses(causesArr) {
    //清空页面
    $("#goingCauses").empty();
    //渲染页面

    let html = "";
    for (let i = 0;i <causesArr.length;i++){
        if(i == 6){
            break;
        }
        html += "<div class=\"swiper-slide\">\n" +
            "                                <div class=\"cause-wrap\">\n" +
            "                                    <figure class=\"m-0\">\n" +
            "                                        <img style='width: 100%' src=\""+causesArr[i].bigpic+"\" alt=\"\">\n" +
            "\n" +
            "                                        <div class=\"figure-overlay d-flex justify-content-center align-items-center position-absolute w-100 h-100\">\n" +
            "                                            <a href=\"single-causes.html?causeId="+causesArr[i].id+"\" class=\"btn gradient-bg mr-2\">立刻捐助</a>\n" +
            "                                        </div><!-- .figure-overlay -->\n" +
            "                                    </figure>\n" +
            "\n" +
            "                                    <div class=\"cause-content-wrap\">\n" +
            "                                        <header class=\"entry-header d-flex flex-wrap align-items-center\">\n" +
            "                                            <h3 class=\"entry-title w-100 m-0 \"><a>"+causesArr[i].title+"</a></h3>\n" +
            "                                        </header><!-- .entry-header -->\n" +
            "\n" +
            "                                        <div class=\"entry-content\">\n" +
            "                                            <p class=\"m-0 hide_text\">"+causesArr[i].summary+"</p>\n" +
            "                                        </div><!-- .entry-content -->\n" +
            "\n" +
            "                                        <div class=\"fund-raised w-100\">\n" +
            "                                            <div class=\"fund-raised-bar-1 barfiller\">\n" +
            "                                                <div class=\"tipWrap\">\n" +
            "                                                    <span class=\"tip\"></span>\n" +
            "                                                </div><!-- .tipWrap -->\n" +
            "\n" +
            "                                                <span class=\"fill\" data-percentage=\""+getPercentage(causesArr[i].raised,causesArr[i].goal)+"\"></span>\n" +
            "                                            </div><!-- .fund-raised-bar -->\n" +
            "\n" +
            "                                            <div class=\"fund-raised-details d-flex flex-wrap justify-content-between align-items-center\">\n" +
            "                                                <div class=\"fund-raised-total mt-4\">\n" +
            "                                                    Raised: ￥"+causesArr[i].raised+"\n" +
            "                                                </div><!-- .fund-raised-total -->\n" +
            "\n" +
            "                                                <div class=\"fund-raised-goal mt-4\">\n" +
            "                                                    Goal: ￥"+causesArr[i].goal+"\n" +
            "                                                </div><!-- .fund-raised-goal -->\n" +
            "                                            </div><!-- .fund-raised-details -->\n" +
            "                                        </div><!-- .fund-raised -->\n" +
            "                                    </div><!-- .cause-content-wrap -->\n" +
            "                                </div><!-- .cause-wrap -->\n" +
            "                            </div><!-- .swiper-slide -->";

    }
    //写入页面
    $("#goingCauses").append(html);
    //更新轮播图
    causesSlider.update(true);

}
//展示已经实现的目标
function showReachedGoal() {
    //展示已经筹集的总资金
    showRaisedMoney();
    //展示已经完成的慈善项目个数
    showFinishedCauseNum();
    //展示志愿者人数
    showVolunteerNum();
}

function showRaisedMoney() {
    //发请求
    let url = BASE_URL + "/causes/getRaisedMoney";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //展示
            let sum = responseEntity.data === 0 ? 0 : responseEntity.data /1000;
            $("#raisedMoney").attr("data-to",sum);
            $("#raisedMoney").countTo({
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}

function showFinishedCauseNum() {
    //发请求
    let url = BASE_URL + "/causes/getFinishedCauseNum";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //展示
            $("#finishedCauseNum").attr("data-to",responseEntity.data);
            $("#finishedCauseNum").countTo({
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}

function showVolunteerNum() {
    //发请求
    let url = BASE_URL + "/volunteer/getVolunteerNum";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //展示
            $("#volunteerNum").attr("data-to",responseEntity.data);
            $("#volunteerNum").countTo({
                formatter: function (value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}