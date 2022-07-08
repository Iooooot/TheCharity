$(function () {
    //分页查询慈善项目
    //当前页面
    window.pageNum = 1;
    //页面展示大小
    window.pageSize = 3;
    //搜索关键词
    window.keyword="";
    //分页
    generatePage();
    //给搜索绑定单击事件
    $("#searchBtn").click(function () {
        //获取搜索内容
        let searchContent = $("#searchInput").val();
        $("#searchInput").val("");
        window.keyword = searchContent;
        window.pageNum = 1;
        generatePage();
    })

    //获取近期慈善项目
    if (sessionStorage.getItem("recentlyCauses") === undefined || sessionStorage.getItem("recentlyCauses") == null) {
        //没有缓存就查询
        queryRecentlyCauses();
    } else {
        //若不为空将json字符串转为js对象
        let recentlyCauses = JSON.parse(sessionStorage.getItem("recentlyCauses"));
        showRecentlyCauses(recentlyCauses);
    }
    //获取特色公益
    if (sessionStorage.getItem("featureCauses") === undefined || sessionStorage.getItem("featureCauses") == null) {
        //没有缓存就查询
        queryFeatureCauses();
    } else {
        //若不为空将json字符串转为js对象
        let featureCauses = JSON.parse(sessionStorage.getItem("featureCauses"));
        showFeatureCauses(featureCauses);
    }

    //获取热门活动
    if (sessionStorage.getItem("hotCauses") === undefined || sessionStorage.getItem("hotCauses") == null) {
        //没有缓存就查询
        queryHotCauses();
    } else {
        //若不为空将json字符串转为js对象
        let hotCauses = JSON.parse(sessionStorage.getItem("hotCauses"));
        showHotCauses(hotCauses);
    }

})
//分页
function generatePage() {
    //分页查询慈善项目
    let url =BASE_URL+"/causes/getCausesPage";
    let args = {
        "pageNum": window.pageNum,
        "pageSize": window.pageSize,
        "keyword": window.keyword
    }
    $.post(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功后端返回分页对象
            //展示
            showCausesPage(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//在页面展示
function showCausesPage(causesPage) {
    $("#causesPage").empty();
    let html = "";
    //判断是否搜索到
    if(causesPage.records == null || causesPage.records.length === 0){
        html += "<div align=\"center\" style=\"margin-top: 20%\"><h2>抱歉！没有查询到您搜索的数据！</h2></div>";
    }else{
        //生成分页主体
        for (let i = 0;i < causesPage.records.length;i++){
            html += "<div class=\"news-content\">\n" +
                "                        <a><img src=\""+causesPage.records[i].bigpic+"\" alt=\"\"></a>\n" +
                "\n" +
                "                        <header class=\"entry-header d-flex flex-wrap justify-content-between align-items-center\">\n" +
                "                            <div class=\"header-elements\">\n" +
                "                                <div class=\"posted-date\">"+causesPage.records[i].createTime+"</div>\n" +
                "\n" +
                "                                <h2 class=\"entry-title\"><a>"+causesPage.records[i].title+"</a></h2>\n" +
                "\n" +
                "                                <div class=\"post-metas d-flex flex-wrap align-items-center\">\n" +
                "                                    <span class=\"cat-links\">Charity <a>Causes</a></span>\n" +
                "                                    <span class=\"post-author\">by <a href=\"#\" onclick='searchByAuthor()'>"+causesPage.records[i].author+"</a></span>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "\n" +
                "                            <div class=\"donate-icon\">\n" +
                "                                <a href=\"single-causes.html?causeId="+causesPage.records[i].id+"#donate\"><img src=\"images/donate-icon.png\" alt=\"\"></a>\n" +
                "                            </div>\n" +
                "                        </header>\n" +
                "\n" +
                "                        <div class=\"entry-content\">\n" +
                "                            <p class=\"hide_text\">"+causesPage.records[i].summary+"</p>\n" +
                "                        </div>\n" +
                "\n" +
                "                        <footer class=\"entry-footer\">\n" +
                "                            <a href=\"single-causes.html?causeId="+causesPage.records[i].id+"\" class=\"btn gradient-bg\">了解更多</a>\n" +
                "                        </footer>\n" +
                "                    </div>";
        }
        //生成页码导航
        html += "<ul class=\"pagination d-flex flex-wrap align-items-center p-0\">";
        //第一页永远存在
        if(causesPage.current === "1"){
            html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">01</a></li>";
        }else{
            html += "<li><a href=\"#\" onclick='changePage(1)'>01</a></li>";
        }
        //生成中间页面
        let begin;//开始位置
        let end;//结束
        //1.显示10个页码
        if(causesPage.pages < 10){
            //总页码不够10页
            begin=2;
            end=causesPage.pages-1;
        }else{
            //超过10页
            begin=causesPage.current-4;
            end=causesPage.current+3;
            //如果前边不够4个后面补齐
            if(begin<1){
                begin=2;
                end=begin+8;
            }
            //后边不够3个前面补齐
            if(end>causesPage.pages - 1){
                end=causesPage.pages-1;
                begin=end-7;
                html += "<li><a>.......</a></li>"
            }
        }
        for (let i=begin;i<=end;i++){
            if((i+"") === causesPage.current){
                html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">"+formatPageNum(i)+"</a></li>";
            }else{
                html += "<li><a href=\"#\" onclick='changePage("+i+")'>"+formatPageNum(i)+"</a></li>";
            }
        }
        if(causesPage.pages > 10 && end <= 10){
            html += "<li><a>.......</a></li>"
        }
        //最后一页永远存在
        if(causesPage.pages != 1){
            if(causesPage.current === causesPage.pages){
                html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">"+formatPageNum(causesPage.pages)+"</a></li>";
            }else{
                html += "<li><a href=\"#\" onclick='changePage("+causesPage.pages+")'>"+formatPageNum(causesPage.pages)+"</a></li>";
            }
        }
        html += "</ul>";
    }
    $("#causesPage").append(html);
}
function changePage(num) {
    window.pageNum = num;
    generatePage();
    return false;
}

//点击项目作者查询该作者发布的所有项目
function searchByAuthor(){
    window.keyword = event.target.innerHTML;
    window.pageNum = 1;
    generatePage();
    return false;
}
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
//展示近期活动
function showRecentlyCauses(causesArr) {
    //清空页面
    $("#upcoming-events").empty();
    //渲染页面
    let html = "";
    for (let i = 0; i < causesArr.length;i++){
        html += "<li class=\"d-flex flex-wrap justify-content-between align-items-center\">\n" +
            "                                    <figure><a><img src=\""+causesArr[i].smallpic+"\" alt=\"\"></a></figure>\n" +
            "\n" +
            "                                    <div class=\"entry-content\">\n" +
            "                                        <h3 class=\"entry-title\"><a href=\"single-causes.html?causeId="+causesArr[i].id+"\">"+causesArr[i].title+"</a></h3>\n" +
            "\n" +
            "                                        <div class=\"post-metas d-flex flex-wrap align-items-center\">\n" +
            "                                            <span class=\"posted-date\"><a>"+causesArr[i].createTime+"</a></span>\n" +
            "                                            <span class=\"event-location\"><a>"+causesArr[i].author+"</a></span>\n" +
            "                                        </div>\n" +
            "\n" +
            "                                        <p class=\"hide_text\">"+causesArr[i].summary+"</p>\n" +
            "                                    </div>\n" +
            "                                </li>";
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
    html += "<h2>特色公益</h2>";
    html += "<div class=\"cause-wrap\">\n" +
        "                                <figure class=\"m-0 position-relative\">\n" +
        "                                    <a><img src=\""+causesArr[0].bigpic+"\" alt=\"\"></a>\n" +
        "                                </figure>\n" +
        "\n" +
        "                                <div class=\"cause-content-wrap\">\n" +
        "                                    <header class=\"entry-header d-flex flex-wrap align-items-center\">\n" +
        "                                        <h3 class=\"entry-title w-100 m-0\"><a href=\"single-causes.html?causeId="+causesArr[0].id+"\">"+causesArr[0].title+"</a></h3>\n" +
        "                                    </header><!-- .entry-header -->\n" +
        "\n" +
        "                                    <div class=\"entry-content\">\n" +
        "                                        <p class=\"m-0 hide_text\">"+causesArr[0].summary+"</p>\n" +
        "                                    </div><!-- .entry-content -->\n" +
        "\n" +
        "                                    <div class=\"fund-raised w-100\">\n" +
        "                                        <div class=\"fund-raised-bar-3 barfiller\">\n" +
        "                                            <div class=\"tipWrap\">\n" +
        "                                                <span class=\"tip\"></span>\n" +
        "                                            </div><!-- .tipWrap -->\n" +
        "\n" +
        "                                            <span class=\"fill\" data-percentage=\""+getPercentage(causesArr[0].raised,causesArr[0].goal)+"\"></span>\n" +
        "                                        </div><!-- .fund-raised-bar -->\n" +
        "\n" +
        "                                        <div class=\"fund-raised-details d-flex flex-wrap justify-content-between align-items-center\">\n" +
        "                                            <div class=\"fund-raised-total mt-4\">\n" +
        "                                                Raised: ￥"+causesArr[0].raised+"\n" +
        "                                            </div><!-- .fund-raised-total -->\n" +
        "\n" +
        "                                            <div class=\"fund-raised-goal mt-4\">\n" +
        "                                                Goal: ￥"+causesArr[0].goal+"\n" +
        "                                            </div><!-- .fund-raised-goal -->\n" +
        "                                        </div><!-- .fund-raised-details -->\n" +
        "                                    </div><!-- .fund-raised -->\n" +
        "                                </div><!-- .cause-content-wrap -->\n" +
        "                            </div><!-- .cause-wrap -->";
    //写入页面
    $("#featured-cause").append(html);

}

//查询热门活动
function queryHotCauses() {
    //缓存没有就发请求
    let url = BASE_URL + "/causes/getHotCauses";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //存入sessionStorage
            sessionStorage.setItem("hotCauses",JSON.stringify(responseEntity.data));
            //展示
            showHotCauses(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}

function showHotCauses(causesArr) {
    //清空页面
    $("#popular-posts").empty();
    //渲染页面
    let html = "";
    for (let i = 0;i < causesArr.length;i++){
        html += "<li class=\"d-flex flex-wrap justify-content-between align-items-center\">\n" +
            "                                    <figure><a><img src=\""+causesArr[i].smallpic+"\" alt=\"\"></a></figure>\n" +
            "\n" +
            "                                    <div class=\"entry-content\">\n" +
            "                                        <h3 class=\"entry-title\"><a href=\"single-causes.html?causeId="+causesArr[i].id+"\">"+causesArr[i].title+"</a></h3>\n" +
            "\n" +
            "                                        <div class=\"posted-date\">"+causesArr[i].createTime+"</div>\n" +
            "                                    </div>\n" +
            "                                </li>";
    }
    //写入页面
    $("#popular-posts").append(html);
}