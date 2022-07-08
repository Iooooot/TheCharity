$(function () {
    //分页查询志愿者
    //1.为分页操作准备初始化数据
    window.pageNum=1;
    window.pageSize=8;
    window.keyword="";
    //执行分页查询函数
    generatePage();
})
//删除单个活动
function delOne(e) {
    let id = e.getAttribute("data-id");
    layer.confirm('是否确定删除该评论', {
        btn: ['确定','取消'] //按钮
    },function(){
        //发请求删除
        let url =BASE_URL+"/comments/delOneById";
        let args = {"id":id};
        $.get(url,args,function(responseEntity) {
            if(responseEntity.result === "SUCCESS"){
                //删除成功
                layer.msg("删除成功!");
                generatePage();
            }else{
                //查询失败进行提示
                layer.msg(responseEntity.message);
            }
        });
    });
}
//删除选中
function delChecked() {
    //获取选择的单选框
    let checkboxs = $(":checkbox[name='items']:checked");
    let arrId = new Array();
    //依次遍历获得id
    for (let i = 0; i < checkboxs.length; i++) {
        let dom= checkboxs[i].parentNode.parentNode.nextSibling.nextSibling;
        let id = $(dom).text();
        arrId.push(Number(id));
    }
    if(checkboxs.length > 0){
        layer.confirm('是否确定删除这些评论吗？', {
            btn: ['确定','取消'] //按钮
        },function(){
            //发送请求
            //发请求删除
            let url =BASE_URL+"/comments/delCommentsById";
            let args = {"arrId":arrId};
            console.log(arrId);
            $.post(url,args,function(responseEntity) {
                if(responseEntity.result === "SUCCESS"){
                    //删除成功
                    layer.msg("删除成功!");
                    generatePage();
                }else{
                    //查询失败进行提示
                    layer.msg(responseEntity.message);
                }
            });
        })
    }

}

//根据搜索关键字分页
function searchKeyword() {
    //获取查询关键字
    window.keyword=$("#keywordInput").val();
    //执行查询
    generatePage();
}
function showMessage(e) {
    $("#commentMessage").text($(e).text());
    //打开模态框
    $("#MoreInfo").modal("show");
}

//分页展示
function generatePage() {
    //查询所有评论
    let url =BASE_URL+"/comments/getCommentsPage";
    let args = {
        "pageNum": window.pageNum,
        "pageSize": window.pageSize,
        "keyword": window.keyword
    }
    let html = "";
    $.post(url,args,function(responseEntity){
        if(responseEntity.result=="SUCCESS"){
            $("#commentsPage").empty();
            if(responseEntity.data.records.length === 0){
                html+="<tr><td colspan='7' align='center'>抱歉！没有查询到您搜索的数据！</td></tr>"
            }else {
                for (let i = 0; i < responseEntity.data.records.length; i++) {
                    html += "<tr>\n" +
                        "            <td><label class=\"i-checks m-b-none\"><input type=\"checkbox\" name=\"items\"><i></i></label></td>\n" +
                        "\t\t\t<td>"+responseEntity.data.records[i].id+"</td>\n" +
                        "            <td>"+responseEntity.data.records[i].createByName+"</td>\n" +
                        "\t\t\t<td><p onclick=\"showMessage(this)\">"+responseEntity.data.records[i].content+"</p></td>\n" +
                        "            <td><span>"+responseEntity.data.records[i].createTime+"</span></td>\n" +
                        "\t\t\t<td>"+responseEntity.data.records[i].newsId+"</td>\n" +
                        "            <td>\n" +
                        "              <i data-id='"+responseEntity.data.records[i].id+"' class=\"fa fa-times text-danger text\" onclick='delOne(this)'></i>\n" +
                        "            </td>\n" +
                        "          </tr>";
                }
            }
            $("#commentsPage").append(html);
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

