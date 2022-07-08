$(function () {
    //分页查询志愿者
    //1.为分页操作准备初始化数据
    window.pageNum=1;
    window.pageSize=8;
    window.keyword="";
    //执行分页查询函数
    generatePage();
})

//删除单个资讯
function delOne(e) {
    let id = e.getAttribute("data-id");
    layer.confirm('是否确定删除该资讯', {
        btn: ['确定','取消'] //按钮
    },function(){
        //发请求删除
        let url =BASE_URL+"/news/delOneById";
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
        layer.confirm('是否确定删除这些资讯？', {
            btn: ['确定','取消'] //按钮
        },function(){
            //发送请求
            //发请求删除
            let url =BASE_URL+"/news/delNewsById";
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
//更新资讯
function editNews() {
    let id = $("#newsId").val();
    let NTitle = $("#edit_NTitle").val();
    let author = $("#edit_author").val();
    let summary = $("#edit_summary").val();
    let content = $("#edit_content").val();
    let NewsStatus = $("#edit_NewsStatus").val();
    let bigPicResource = $("#bigPicResource").val();
    if(NTitle==null||NTitle==""||author==null||author==""||summary==null||summary==""||content==null||content==""||NewsStatus==null||NewsStatus==""){
        layer.msg("请输入相应信息再提交!");
    }else{
        //异步提交数据
        let url =BASE_URL+"/news/updateNews";
        let args = {"id":id,"title":NTitle,"content":content,"summary":summary,"type":NewsStatus,"author":author,"bigpic":bigPicResource};
        $.post(url,args,function(responseEntity) {
            if(responseEntity.result === "SUCCESS"){
                //插入成功
                $("#editModal").modal("hide");
                layer.msg("修改成功!");
                generatePage();
            }else{
                //查询失败进行提示
                layer.msg(responseEntity.message);
            }
        });
    }
}

function showEditModel(e) {
    //获取数据展示在编辑框中
    let id = e.getAttribute("data-id");
    //异步查询
    showEditInfo(id);
    //打开模态框
    $("#editModal").modal("show");
}
//回显资讯信息
function showEditInfo(id){
    let url =BASE_URL+"/news/getNews";
    let args = {"id":id};
    $.get(url,args,function(responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //查找成功
            //进行回显
            $("#newsId").val(id);
            $("#edit_NTitle").val(responseEntity.data.title);
            $("#edit_author").val(responseEntity.data.author);
            $("#edit_content").val(responseEntity.data.content);
            $("#edit_summary").val(responseEntity.data.summary);
            let options = $("#edit_NewsStatus option");
            for (let i = 0; i < options.length; i++) {
                if($(options[i]).val() === responseEntity.data.type){
                    $(options[i]).prop("selected","selected");
                }
            }
        }else{
            //查询失败进行提示
            layer.msg(responseEntity.message);
        }
    });
}


function showAddModel() {
    //打开模态框
    $("#addModal").modal("show");
}
//添加资讯
function addNews() {
    let NTitle = $("#add_NTitle").val();
    let author = $("#add_author").val();
    let summary = $("#add_summary").val();
    let content = $("#add_content").val();
    let NewsStatus = $("#add_NewsStatus").val();
    let ibigPicResource = $("#ibigPicResource").val();
    if(NTitle==null||NTitle==""||author==null||author==""||content==null||summary==""||summary==null||content==""||NewsStatus==null||NewsStatus==""||ibigPicResource==null||ibigPicResource==""){
        layer.msg("请输入相应信息再提交!");
    }else{
        //发送请求
        let url =BASE_URL+"/news/insertNews";
        let args = {"title":NTitle,"content":content,"summary":summary,"type":NewsStatus,"author":author,"bigpic":ibigPicResource};
        $.post(url,args,function(responseEntity) {
            if(responseEntity.result === "SUCCESS"){
                //插入成功
                $("#addModal").modal("hide");
                //清空数据
                $("#addForm input").val("");
                $("#addForm textarea").val("");
                layer.msg("添加成功!");
                generatePage();
            }else{
                //查询失败进行提示
                layer.msg(responseEntity.message);
            }
        });
    }
}

//根据搜索关键字分页
function searchKeyword() {
    //获取查询关键字
    window.keyword=$("#keywordInput").val();
    //执行查询
    generatePage();
}

//展示留言
function showMessage(e) {
    $("#newsMessage").text($(e).text());
    //打开模态框
    $("#MoreInfo").modal("show");
}

//分页展示
function generatePage() {
    //查询所有新闻资讯
    let url =BASE_URL+"/news/getNewsPage";
    let args = {
        "pageNum": window.pageNum,
        "pageSize": window.pageSize,
        "keyword": window.keyword
    }
    let html = "";
    $.post(url,args,function(responseEntity){
        if(responseEntity.result=="SUCCESS"){
            $("#newsPage").empty();
            if(responseEntity.data.records.length === 0){
                html+="<tr><td colspan='10' align='center'>抱歉！没有查询到您搜索的数据！</td></tr>"
            }else {
                for (let i = 0; i < responseEntity.data.records.length; i++) {
                    html += "<tr>\n" +
                        "            <td><label class=\"i-checks m-b-none\"><input type=\"checkbox\" name=\"items\"><i></i></label></td>\n" +
                        "\t\t\t<td>" + responseEntity.data.records[i].id + "</td>\n" +
                        "            <td>" + responseEntity.data.records[i].title + "</td>\n" +
                        "\t\t\t<td>" + responseEntity.data.records[i].author + "</td>\n" +
                        "\t\t\t<td><p onclick=\"showMessage(this)\">" + responseEntity.data.records[i].summary + "</p></td>\n" +
                        "            <td><span>" + responseEntity.data.records[i].createTime + "</span></td>\n" +
                        "            <td><span>" + responseEntity.data.records[i].type + "</span></td>\n" +
                        "            <td>\n" +
                        "              <i data-id = '" + responseEntity.data.records[i].id + "' class=\"fa fa-wrench text-success text-active editNews\" onclick=\"showEditModel(this)\"></i><i data-id = '" + responseEntity.data.records[i].id + "' class=\"fa fa-times text-danger text\" onclick=\"delOne(this)\"></i>\n" +
                        "            </td>\n" +
                        "          </tr>";
                }
            }
            $("#newsPage").append(html);
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