$(function () {
    //1.为分页操作准备初始化数据
    window.pageNum=1;
    window.pageSize=8;
    window.keyword="";
    //执行分页查询函数
    generatePage();
})

//展示留言
function showMessage(e) {
    $("#donateMessage").text($(e).text());
    //打开模态框
    $("#MoreInfo").modal("show");
}
function searchKeyword() {
    //获取查询关键字
    window.keyword=$("#keywordInput").val();
    //执行查询
    generatePage();
}


function generatePage() {
    //查询所有捐助数据
    let url =BASE_URL+"/donations/getDonationsPage";
    let args = {
        "pageNum": window.pageNum,
        "pageSize": window.pageSize,
        "keyword": window.keyword
    }
    let html = "";
    $.post(url,args,function(responseEntity){
        if(responseEntity.result=="SUCCESS"){
            $("#donations").empty();
            if(responseEntity.data.records.length === 0){
                html+="<tr><td colspan='6' align='center'>抱歉！没有查询到您搜索的数据！</td></tr>"
            }else {
                for (let i = 0; i < responseEntity.data.records.length; i++) {
                    html += "<tr>\n" +
                        "            <td>" + responseEntity.data.records[i].id + "</td>\n" +
                        "            <td><span>" + responseEntity.data.records[i].amount + "</span>¥</td>\n" +
                        "            <td>" + responseEntity.data.records[i].username + "</td>\n" +
                        "            <td><P onclick=\"showMessage(this)\">" + responseEntity.data.records[i].message + "</P></td>\n" +
                        "            <td>" + responseEntity.data.records[i].causeId + "</td>\n" +
                        "            <td>" + responseEntity.data.records[i].createTime + "</td>\n" +
                        "          </tr>";
                }
            }
            $("#donations").append(html);
            if(responseEntity.data.records.length !== 0) {
                //生成导航条
                html = "<div id=\"Pagination\" class=\"pagination\"><!-- 这里显示分页 --></div>";
                $("#paginationBody").empty();
                $("#paginationBody").append(html);
                generateNavigator(responseEntity.data);
            }
        }else{
            //查询失败进行提示
            layer.msg(responseEntity.message);
        }
    });
}
