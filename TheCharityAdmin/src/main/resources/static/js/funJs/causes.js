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
    layer.confirm('是否确定删除该活动', {
        btn: ['确定','取消'] //按钮
    },function(){
        //发请求删除
        let url =BASE_URL+"/causes/delOneById";
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
        layer.confirm('是否确定删除这些活动吗？', {
            btn: ['确定','取消'] //按钮
        },function(){
            //发送请求
            //发请求删除
            let url =BASE_URL+"/causes/delCausesById";
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

function editCause() {
    var id = $("#causeId").val();
    var CTitle = $("#edit_CTitle").val();
    var author = $("#edit_author").val();
    var content = $("#edit_content").val();
    var background = $("#edit_background").val();
    var task = $("#edit_task").val();
    var goal = $("#edit_goal").val();
    var CauseStatus = $("#edit_CauseStatus").val();
    var bigPicResource = $("#bigPicResource").val();
    var smallPicResource = $("#smallPicResource").val();
    if(CTitle==null||CTitle==""||author==null||author==""||content==null||content==""||background==null||background==""||task==null||task==""||goal==null||goal==""||CauseStatus==null||CauseStatus==""){
        layer.msg("请输入相应信息再提交!");
    }else{
        //异步提交数据
        let url =BASE_URL+"/causes/updateCauses";
        let args = {"id":id,"title":CTitle,"summary":content,"author":author,
            "task":task,"background":background,"goal":goal,"type":CauseStatus,"bigpic":bigPicResource,"smallpic":smallPicResource};
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

function showEditInfo(id){
    let url =BASE_URL+"/causes/getCauses";
    let args = {"id":id};
    $.get(url,args,function(responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //查找成功
            //进行回显
            $("#causeId").val(id);
            $("#edit_CTitle").val(responseEntity.data.title);
            $("#edit_author").val(responseEntity.data.author);
            $("#edit_task").val(responseEntity.data.task);
            $("#edit_content").val(responseEntity.data.summary);
            $("#edit_background").val(responseEntity.data.background);
            $("#edit_goal").val(responseEntity.data.goal);
            let options = $("#edit_CauseStatus option");
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
//添加活动
function addCause() {
    var CTitle = $("#add_CTitle").val();
    var author = $("#add_author").val();
    var content = $("#add_content").val();
    var background = $("#add_background").val();
    var task = $("#add_task").val();
    var goal = $("#add_goal").val();
    var CauseStatus = $("#add_CauseStatus").val();
    var ibigPicResource = $("#ibigPicResource").val();
    var ismallPicResource = $("#ismallPicResource").val();
    if(CTitle==null||CTitle==""||author==null||author==""||content==null||content==""||background==null||background==""||task==null||task==""||goal==null||goal==""||CauseStatus==null||CauseStatus==""||ibigPicResource==null||ibigPicResource==""
        ||ismallPicResource==null||ismallPicResource==""){
        layer.msg("请输入相应信息再提交!");
    }else{
        //发送请求
        let url =BASE_URL+"/causes/insertCauses";
        let args = {"title":CTitle,"summary":content,"author":author,"task":task,"background":background,"goal":goal,"type":CauseStatus,"bigpic":ibigPicResource,"smallpic":ismallPicResource};
        $.post(url,args,function(responseEntity) {
            if(responseEntity.result === "SUCCESS"){
                //插入成功
                $("#addModal").modal("hide");
                //清空数据
                $("#formContent input").val("");
                $("#formContent textarea").val("");
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
    $("#donateMessage").text($(e).text());
    //打开模态框
    $("#MoreInfo").modal("show");
}

//分页展示
function generatePage() {
    //查询所有慈善项目
    let url =BASE_URL+"/causes/getCausesPage";
    let args = {
        "pageNum": window.pageNum,
        "pageSize": window.pageSize,
        "keyword": window.keyword
    }
    let html = "";
    $.post(url,args,function(responseEntity){
        if(responseEntity.result=="SUCCESS"){
            $("#causesPage").empty();
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
                        "            <td>" + responseEntity.data.records[i].raised + "¥</td>\n" +
                        "\t\t\t<td>" + responseEntity.data.records[i].goal + "¥</td>\n" +
                        "\t\t\t<td><span>" + responseEntity.data.records[i].createTime + "</span></td>\n" +
                        "            <td><span>" + responseEntity.data.records[i].type + "</span></td>\n" +
                        "            <td>\n" +
                        "              <i data-id = '" + responseEntity.data.records[i].id + "' class=\"fa fa-wrench text-success text-active editCause\" onclick=\"showEditModel(this)\"></i><i data-id = '" + responseEntity.data.records[i].id + "' class=\"fa fa-times text-danger text\" onclick='delOne(this)'></i>\n" +
                        "            </td>\n" +
                        "          </tr>";
                }
            }
            $("#causesPage").append(html);
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
