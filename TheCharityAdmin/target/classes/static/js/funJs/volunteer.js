$(function () {
    //分页查询志愿者
    //1.为分页操作准备初始化数据
    window.pageNum=1;
    window.pageSize=8;
    window.keyword="";
    //执行分页查询函数
    generatePage();
    //查询专业技能存在sessionStorage中
    findSkills();

})
function showEditModel(e) {
    //获取数据展示在编辑框中
    let id = e.getAttribute("data-id");
    //异步查询
    showEditInfo(id);
    //打开模态框
    $("#editModal").modal("show");
}
//修改志愿者信息
function editVolunteer() {
    let id = $("#volunteerId").val();
    var Vtname = $("#edit_Vtname").val();
    var tel = $("#edit_tel").val();
    var email = $("#edit_email").val();
    var address = $("#edit_address").val();
    var skill = $("#edit_skill").val();
    var age = $("#edit_age").val();
    var sex = $("input[name='sex']:checked").val();
    if(Vtname==null||Vtname==""||tel==null||tel==""||email==null||email==""||address==null||address==""||skill==null||skill==""||age==null||age==""||sex==null||sex==""){
        layer.msg("请输入相应信息再提交!");
    }else{
        //异步提交数据
        let url =BASE_URL+"/volunteer/updateVolunteer";
        let args = {"id":id,"name":Vtname,"address":address,"sex":sex,"age":age,"email":email,"phoneNumber":tel,"skillId":skill};
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

function showEditInfo(id) {
    let url =BASE_URL+"/volunteer/getVolunteer";
    let args = {"id":id};
    $.get(url,args,function(responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //查找成功
            //进行回显
            $("#volunteerId").val(id);
            $("#edit_Vtname").val(responseEntity.data.name);
            $("#edit_tel").val(responseEntity.data.phoneNumber);
            $("#edit_email").val(responseEntity.data.email);
            $("#edit_address").val(responseEntity.data.address);
            $("#edit_skill").empty();
            let html = "<option name =\"skills\">请选择自己擅长的专业技能：</option>";
            let skillsArr = JSON.parse(sessionStorage.getItem("skills"));
            for (let i = 0; i < skillsArr.length; i++) {
                if(skillsArr[i].id === responseEntity.data.skillId){
                    html += "<option name =\"skills\" value='"+skillsArr[i].id+"' selected=\"selected\">"+skillsArr[i].skillName+"</option>";
                }
                html += "<option name =\"skills\" value='"+skillsArr[i].id+"'>"+skillsArr[i].skillName+"</option>";
            }
            $("#edit_skill").append(html);
            $("#edit_age").val(responseEntity.data.age);
            if(responseEntity.data.sex === "1"){
                $("#edit_sex").prop("checked","checked");
            }else{
                $("#edit_sex2").prop("checked","checked");
            }
        }else{
            //查询失败进行提示
            layer.msg(responseEntity.message);
        }
    });
}

function showAddModel(){
    //打开模态框
    $("#addModal").modal("show");
    //展示技能列表
    $("#add_skill").empty();
    let html = "<option name =\"skills\">请选择自己擅长的专业技能：</option>";
    let skillsArr = JSON.parse(sessionStorage.getItem("skills"));
    for (let i = 0; i < skillsArr.length; i++) {
        html += "<option name =\"skills\" value='"+skillsArr[i].id+"'>"+skillsArr[i].skillName+"</option>";
    }
    $("#add_skill").append(html);
}
//添加志愿者
function addVolunteer() {
    var Vtname = $("#add_Vtname").val();
    var tel = $("#add_tel").val();
    var email = $("#add_email").val();
    var address = $("#add_address").val();
    var skill = $("#add_skill").val();
    var age = $("#add_age").val();
    var sex = $("input[name='sex']:checked").val();
    if(Vtname==null||Vtname==""||tel==null||tel==""||email==null||email==""||address==null||address==""||skill==null||skill==""||age==null||age==""||sex==null||sex==""){
        layer.msg("请输入相应信息再提交!");
    }else{
        let url =BASE_URL+"/volunteer/insertVolunteer";
        let args = {"name":Vtname,"address":address,"sex":sex,"age":age,"email":email,"phoneNumber":tel,"skillId":skill};
        $.post(url,args,function(responseEntity) {
            if(responseEntity.result === "SUCCESS"){
                //插入成功
                $("#addModal").modal("hide");
                //清空数据
                $("#formContent input").val("");
                layer.msg("添加成功!");
                generatePage();
            }else{
                //查询失败进行提示
                layer.msg(responseEntity.message);
            }
        });
    }
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
        layer.confirm('是否确定删除这些志愿者吗？', {
            btn: ['确定','取消'] //按钮
        },function(){
            //发送请求
            //发请求删除
            let url =BASE_URL+"/volunteer/delVolunteersById";
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


//删除志愿者
function delOne(e) {
    //获取志愿者id
    let id = e.getAttribute("data-id");
    layer.confirm('是否确定删除该志愿者', {
        btn: ['确定','取消'] //按钮
    },function(){
        //发请求删除
        let url =BASE_URL+"/volunteer/delOneById";
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


//查询技能
function findSkills() {
    let url =BASE_URL+"/skill/getSkills";
    let args = {};
    $.get(url,args,function(responseEntity) {
        if(responseEntity.result === "SUCCESS"){
            //存sessionStorage中
            sessionStorage.setItem("skills",JSON.stringify(responseEntity.data));
        }else{
            //查询失败进行提示
            layer.msg(responseEntity.message);
        }
    });
}

//根据搜索关键字分页
function searchKeyword() {
    //获取查询关键字
    window.keyword=$("#keywordInput").val();
    //执行查询
    generatePage();
}
//分页展示
function generatePage() {
    //查询所有捐助数据
    let url =BASE_URL+"/volunteer/getVolunteerPage";
    let args = {
        "pageNum": window.pageNum,
        "pageSize": window.pageSize,
        "keyword": window.keyword
    }
    let html = "";
    $.post(url,args,function(responseEntity){
        if(responseEntity.result=="SUCCESS"){
                $("#volunteerPage").empty();
                if(responseEntity.data.records.length === 0){
                    html+="<tr><td colspan='9' align='center'>抱歉！没有查询到您搜索的数据！</td></tr>"
                }else {
                    for (let i = 0; i < responseEntity.data.records.length; i++) {
                        html += "<tr>\n" +
                            "            <td><label class=\"i-checks m-b-none\"><input type=\"checkbox\" name=\"items\"><i></i></label></td>\n" +
                            "\t\t\t<td>" + responseEntity.data.records[i].id + "</td>\n" +
                            "            <td>" + responseEntity.data.records[i].name + "</td>\n" +
                            "\t\t\t<td>" + responseEntity.data.records[i].skill + "</td>\n" +
                            "\t\t\t<td>" + responseEntity.data.records[i].phoneNumber + "</td>\n" +
                            "            <td><span class=\"text-ellipsis\">" + responseEntity.data.records[i].email + "</span></td>\n" +
                            "            <td><span class=\"text-ellipsis\">" + responseEntity.data.records[i].address + "</span></td>\n" +
                            "\t\t\t<td>" + responseEntity.data.records[i].createTime + "</td>\n" +
                            "            <td>\n" +
                            "              <i data-id = '" + responseEntity.data.records[i].id + "' class=\"fa fa-wrench text-success text-active editVolunteer\" onclick=\"showEditModel(this)\"></i><i data-id = '" + responseEntity.data.records[i].id + "' class=\"fa fa-times text-danger text\" onclick='delOne(this)'></i>\n" +
                            "            </td>\n" +
                            "          </tr>";
                    }
                }
                $("#volunteerPage").append(html);
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

