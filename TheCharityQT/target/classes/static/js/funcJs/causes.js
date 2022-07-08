$(function () {
    //获取特色公益
    if(sessionStorage.getItem("featureCauses") === undefined||sessionStorage.getItem("featureCauses")==null){
        //没有缓存就查询
        queryFeatureCauses();
    }else{
        //若不为空将json字符串转为js对象
        let featureCauses=JSON.parse(sessionStorage.getItem("featureCauses"));
        showFeatureCauses(featureCauses);
    }
    //获取正在进行的慈善项目
    if(sessionStorage.getItem("goingCauses") === undefined||sessionStorage.getItem("goingCauses")==null){
        //没有缓存就查询
        queryGoingCauses();
    }else{
        //若不为空将json字符串转为js对象
        let goingCauses=JSON.parse(sessionStorage.getItem("goingCauses"));
        showGoingCauses(goingCauses);
    }
})

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
    for (let i = 0;i < causesArr.length;i++){
        html += "<div class=\"col-12 col-lg-6\">\n" +
            "                    <div class=\"cause-wrap d-flex flex-wrap justify-content-between\">\n" +
            "                        <figure class=\"m-0\">\n" +
            "                            <img src=\""+causesArr[i].bigpic+"\" alt=\"\">\n" +
            "                        </figure>\n" +
            "\n" +
            "                        <div class=\"cause-content-wrap\">\n" +
            "                            <header class=\"entry-header d-flex flex-wrap align-items-center\">\n" +
            "                                <h3 class=\"entry-title w-100 m-0\"><a href=\"single-causes.html?causeId="+causesArr[i].id+"\">"+causesArr[i].title+"</a></h3>\n" +
            "\n" +
            "                                <div class=\"posted-date\">\n" +
            "                                    <a>"+causesArr[i].createTime+"</a>\n" +
            "                                </div><!-- .posted-date -->\n" +
            "\n" +
            "                                <div class=\"cats-links\">\n" +
            "                                    <a>"+causesArr[i].author+"</a>\n" +
            "                                </div><!-- .cats-links -->\n" +
            "                            </header><!-- .entry-header -->\n" +
            "\n" +
            "                            <div class=\"entry-content\">\n" +
            "                                <p class=\"m-0 hide_text\">"+causesArr[i].summary+"</p>\n" +
            "                            </div><!-- .entry-content -->\n" +
            "\n" +
            "                            <div class=\"entry-footer mt-5\">\n" +
            "                                <a href=\"single-causes.html?causeId="+causesArr[i].id+"#donate\" class=\"btn gradient-bg mr-2\">立刻捐助</a>\n" +
            "                            </div><!-- .entry-footer -->\n" +
            "                        </div><!-- .cause-content-wrap -->\n" +
            "\n" +
            "                        <div class=\"fund-raised w-100\">\n" +
            "                            <div class=\"featured-fund-raised-bar barfiller\">\n" +
            "                                <div class=\"tipWrap\">\n" +
            "                                    <span class=\"tip\"></span>\n" +
            "                                </div><!-- .tipWrap -->\n" +
            "\n" +
            "                                <span class=\"fill\" data-percentage=\""+getPercentage(causesArr[i].raised,causesArr[i].goal)+"\"></span>\n" +
            "                            </div><!-- .fund-raised-bar -->\n" +
            "\n" +
            "                            <div class=\"fund-raised-details d-flex flex-wrap justify-content-between align-items-center\">\n" +
            "                                <div class=\"fund-raised-total mt-4\">\n" +
            "                                    Raised: ￥"+causesArr[i].raised+"\n" +
            "                                </div><!-- .fund-raised-total -->\n" +
            "\n" +
            "                                <div class=\"fund-raised-goal mt-4\">\n" +
            "                                    Goal: ￥"+causesArr[i].goal+"\n" +
            "                                </div><!-- .fund-raised-goal -->\n" +
            "                            </div><!-- .fund-raised-details -->\n" +
            "                        </div><!-- .fund-raised -->\n" +
            "                    </div><!-- .cause-wrap -->\n" +
            "                </div><!-- .col -->";
    }
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
        html += "<div class=\"col-12 col-md-6 col-lg-4\">\n" +
            "                    <div class=\"cause-wrap\">\n" +
            "                        <figure class=\"m-0\">\n" +
            "                            <img src=\""+causesArr[i].bigpic+"\" alt=\"\">\n" +
            "\n" +
            "                            <div class=\"figure-overlay d-flex justify-content-center align-items-center position-absolute w-100 h-100\">\n" +
            "                                <a href=\"single-causes.html?causeId="+causesArr[i].id+"#donate\" class=\"btn gradient-bg mr-2\">立刻捐助</a>\n" +
            "                            </div><!-- .figure-overlay -->\n" +
            "                        </figure>\n" +
            "\n" +
            "                        <div class=\"cause-content-wrap\">\n" +
            "                            <header class=\"entry-header d-flex flex-wrap align-items-center\">\n" +
            "                                <h3 class=\"entry-title w-100 m-0\"><a href=\"single-causes.html?causeId="+causesArr[i].id+"\">"+causesArr[i].title+"</a></h3>\n" +
            "                            </header><!-- .entry-header -->\n" +
            "\n" +
            "                            <div class=\"entry-content\">\n" +
            "                                <p class=\"m-0 hide_text\">"+causesArr[i].summary+"</p>\n" +
            "                            </div><!-- .entry-content -->\n" +
            "\n" +
            "                            <div class=\"fund-raised w-100\">\n" +
            "                                <div class=\"fund-raised-bar-1 barfiller\">\n" +
            "                                    <div class=\"tipWrap\">\n" +
            "                                        <span class=\"tip\"></span>\n" +
            "                                    </div><!-- .tipWrap -->\n" +
            "\n" +
            "                                    <span class=\"fill\" data-percentage=\""+getPercentage(causesArr[i].raised,causesArr[i].goal)+"\"></span>\n" +
            "                                </div><!-- .fund-raised-bar -->\n" +
            "\n" +
            "                                <div class=\"fund-raised-details d-flex flex-wrap justify-content-between align-items-center\">\n" +
            "                                    <div class=\"fund-raised-total mt-4\">\n" +
            "                                        Raised: ￥"+causesArr[i].raised+"\n" +
            "                                    </div><!-- .fund-raised-total -->\n" +
            "\n" +
            "                                    <div class=\"fund-raised-goal mt-4\">\n" +
            "                                        Goal: ￥"+causesArr[i].goal+"\n" +
            "                                    </div><!-- .fund-raised-goal -->\n" +
            "                                </div><!-- .fund-raised-details -->\n" +
            "                            </div><!-- .fund-raised -->\n" +
            "                        </div><!-- .cause-content-wrap -->\n" +
            "                    </div><!-- .cause-wrap -->\n" +
            "                </div><!-- .col -->";

    }
    //写入页面
    $("#goingCauses").append(html);

}