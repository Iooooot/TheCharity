$(function () {
    //分页查询新闻资讯
    //当前页面
    window.pageNum = 1;
    //页面展示大小
    window.pageSize = 5;
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

    //获取热点聚焦
    if (sessionStorage.getItem("hotSpotlight") === undefined || sessionStorage.getItem("hotSpotlight") == null) {
        //没有缓存就查询
        queryHotSpotlight();
    } else {
        //若不为空将json字符串转为js对象
        let hotSpotlight = JSON.parse(sessionStorage.getItem("hotSpotlight"));
        showHotSpotlight(hotSpotlight);
    }
    //获取公益头条
    if (sessionStorage.getItem("publicHeadlines") === undefined || sessionStorage.getItem("publicHeadlines") == null) {
        //没有缓存就查询
        queryPublicHeadlines();
    } else {
        //若不为空将json字符串转为js对象
        let publicHeadlines = JSON.parse(sessionStorage.getItem("publicHeadlines"));
        showPublicHeadlines(publicHeadlines);
    }

    //获取今日要闻
    if (sessionStorage.getItem("todayNews") === undefined || sessionStorage.getItem("todayNews") == null) {
        //没有缓存就查询
        queryTodayNews();
    } else {
        //若不为空将json字符串转为js对象
        let todayNews = JSON.parse(sessionStorage.getItem("todayNews"));
        showTodayNews(todayNews);
    }
})

//分页
function generatePage(){
    //分页查询慈善项目
    let url =BASE_URL+"/news/getNewsPage";
    let args = {
        "pageNum": window.pageNum,
        "pageSize": window.pageSize,
        "keyword": window.keyword
    }
    $.post(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功后端返回分页对象
            //展示
            showNewsPage(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//在页面展示
function showNewsPage(newsPage) {
    $("#newsPage").empty();
    let html = "";
    //判断是否搜索到
    if(newsPage.records == null || newsPage.records.length === 0){
        html += "<div align=\"center\" style=\"margin-top: 20%\"><h2>抱歉！没有查询到您搜索的数据！</h2></div>";
    }else{
        //生成分页主体
        for (let i = 0;i < newsPage.records.length;i++){
            html += "<div class=\"news-content\">\n" +
                "                        \n" +
                "\n" +
                "                        <header class=\"entry-header d-flex flex-wrap justify-content-between align-items-center\">\n" +
                "                            <div class=\"header-elements\">\n" +
                "                                <div class=\"posted-date\">"+newsPage.records[i].createTime+"</div>\n" +
                "\n" +
                "                                <h2 class=\"entry-title\"><a href=\"single-news.html?newsId="+newsPage.records[i].id+"\">"+newsPage.records[i].title+"</a></h2>\n" +
                "\n" +
                "                                <div class=\"post-metas d-flex flex-wrap align-items-center\">\n" +
                "            \n" +
                "                                    <span class=\"post-author\">by <a href=\"#\" onclick='searchByAuthor()' >"+newsPage.records[i].author+"</a></span>\n" +
                "                                    <span class=\"post-comments\"><a>"+newsPage.records[i].commentsNumber+"  "+"Comments</a></span>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "\n" +
                "                          \n" +
                "                        </header>\n" +
                "\n" +
                "                        <div class=\"entry-content\">\n" +
                "                            <p>"+newsPage.records[i].summary+"</p>\n" +
                "                        </div>\n" +
                "\n" +
                "                        <footer class=\"entry-footer\">\n" +
                "                            <a href=\"single-news.html?newsId="+newsPage.records[i].id+"\" class=\"btn gradient-bg\">了解更多</a>\n" +
                "                        </footer>\n" +
                "                    </div>";
        }
        //生成页码导航
        html += "<ul class=\"pagination d-flex flex-wrap align-items-center p-0\">";
        //第一页永远存在
        if(newsPage.current === "1"){
            html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">01</a></li>";
        }else{
            html += "<li><a href=\"#\" onclick='changePage(1)'>01</a></li>";
        }
        //生成中间页面
        let begin;//开始位置
        let end;//结束
        //1.显示10个页码
        if(newsPage.pages < 10){
            //总页码不够10页
            begin=2;
            end=newsPage.pages-1;
        }else{
            //超过10页
            begin=newsPage.current-4;
            end=newsPage.current+3;
            //如果前边不够4个后面补齐
            if(begin<1){
                begin=2;
                end=begin+8;
            }
            //后边不够3个前面补齐
            if(end>newsPage.pages - 1){
                end=newsPage.pages-1;
                begin=end-7;
                html += "<li><a>.......</a></li>"
            }
        }
        for (let i=begin;i<=end;i++){
            if((i+"") === newsPage.current){
                html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">"+formatPageNum(i)+"</a></li>";
            }else{
                html += "<li><a href=\"#\" onclick='changePage("+i+")'>"+formatPageNum(i)+"</a></li>";
            }
        }
        if(newsPage.pages > 10 && end <= 10){
            html += "<li><a>.......</a></li>"
        }
        //最后一页永远存在
        if(newsPage.pages != 1){
            if(newsPage.current === newsPage.pages){
                html += "<li class=\"active\"><a href=\"#\" onclick=\"return false;\">"+formatPageNum(newsPage.pages)+"</a></li>";
            }else{
                html += "<li><a href=\"#\" onclick='changePage("+newsPage.pages+")'>"+formatPageNum(newsPage.pages)+"</a></li>";
            }
        }
        html += "</ul>";
    }
    $("#newsPage").append(html);
}
function changePage(num) {
    window.pageNum = num;
    generatePage();
    return false;
}

//点击资讯作者查询该作者发布的所有项目
function searchByAuthor(){
    window.keyword = event.target.innerHTML;
    window.pageNum = 1;
    generatePage();
    return false;
}

//获取热点聚焦
function queryHotSpotlight() {
    //缓存没有就发请求
    let url = BASE_URL + "/news/getHotSpotlight";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //存入sessionStorage
            sessionStorage.setItem("hotSpotlight",JSON.stringify(responseEntity.data));
            //展示
            showHotSpotlight(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//展示热点聚焦
function showHotSpotlight(newsArr) {
    //清空页面
    $("#hotSpotlight").empty();
    //渲染页面
    let html = "";
    for (let i = 0; i < newsArr.length;i++){
        html += "<li class=\"d-flex flex-wrap justify-content-between align-items-center\">\n" +
            "                                    <figure><a><img src=\""+newsArr[i].bigpic+"\" alt=\"\"></a></figure>\n" +
            "\n" +
            "                                    <div class=\"entry-content\">\n" +
            "                                        <h3 class=\"entry-title\"><a href=\"single-news.html?newsId="+newsArr[i].id+"\">"+newsArr[i].title+"</a></h3>\n" +
            "\n" +
            "                                        <div class=\"posted-date\">"+newsArr[i].createTime+"</div>\n" +
            "                                    </div>\n" +
            "                                </li>";
    }
    //写入页面
    $("#hotSpotlight").append(html);
}
//查询公益头条
function queryPublicHeadlines() {
    //缓存没有就发请求
    let url = BASE_URL + "/news/getPublicHeadlines";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //存入sessionStorage
            sessionStorage.setItem("publicHeadlines",JSON.stringify(responseEntity.data));
            //展示
            showPublicHeadlines(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}
//展示公益头条
function showPublicHeadlines(newsArr) {
    //清空页面
    $("#publicHeadlines").empty();
    //渲染页面
    let html = "";
    for(let i = 0;i < newsArr.length;i++){
        html += "<li class=\"d-flex flex-wrap justify-content-between align-items-center\">\n" +
            "                                    <figure><a><img src=\""+newsArr[i].bigpic+"\" alt=\"\"></a></figure>\n" +
            "                                    <div class=\"entry-content\">\n" +
            "                                        <h3 class=\"entry-title\"><a href=\"single-news.html?newsId="+newsArr[i].id+"\">"+newsArr[i].title+"</a></h3>\n" +
            "\n" +
            "                                        <div class=\"post-metas d-flex flex-wrap align-items-center\">\n" +
            "                                            <span class=\"posted-date\"><a>"+newsArr[i].createTime+"</a></span>\n" +
            "                                            <span class=\"event-location\"><a>"+newsArr[i].author+"</a></span>\n" +
            "                                        </div>\n" +
            "\n" +
            "                                        <p class='hide_text'>"+newsArr[i].summary+"</p>\n" +
            "                                    </div>\n" +
            "                                </li>";
    }
    //写入页面
    $("#publicHeadlines").append(html);

}

//查询今日要闻
function queryTodayNews() {
    //缓存没有就发请求
    let url = BASE_URL + "/news/getTodayNews";
    let args = {};
    $.get(url,args,function (responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //存入sessionStorage
            sessionStorage.setItem("todayNews",JSON.stringify(responseEntity.data));
            //展示
            showTodayNews(responseEntity.data);
        }else{
            //提示用户错误信息
            layer.msg(responseEntity.message);
        }
    })
}

function showTodayNews(todayNews) {
    //清空页面
    $("#todayNews").empty();
    //渲染页面
    let html = "";
    html += "<h2>今日要闻</h2>";
    html += "<div class=\"cause-wrap\">\n" +
        "                                <figure class=\"m-0 position-relative\">\n" +
        "                                    <a><img src=\""+todayNews.bigpic+"\" alt=\"\"></a>\n" +
        "                                </figure>\n" +
        "\n" +
        "                                <div class=\"cause-content-wrap\">\n" +
        "                                    <header class=\"entry-header d-flex flex-wrap align-items-center\">\n" +
        "                                        <h3 class=\"entry-title w-100 m-0\"><a href=\"single-news.html?newsId="+todayNews.id+"\">"+todayNews.title+"</a></h3>\n" +
        "                                    </header><!-- .entry-header -->\n" +
        "\n" +
        "                                    <div class=\"entry-content\">\n" +
        "                                        <p class=\"m-0 hide_text\">"+todayNews.summary+"</p>\n" +
        "                                    </div><!-- .entry-content -->\n" +
        "\n" +
        "                                    \n" +
        "                                </div><!-- .cause-content-wrap -->\n" +
        "                            </div><!-- .cause-wrap -->";
    //写入页面
    $("#todayNews").append(html);
}