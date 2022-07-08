$(function () {
    //获取已经筹集的总资金
    requestForNum("/causes/getRaisedAmount","raisedAmount");
    //获取已注册的用户数
    requestForNum("/user/getUsersNum","usersNum");
    //获取志愿者人数
    requestForNum("/volunteer/getVolunteerNum","volunteerNum");
    //获取新闻报道数
    requestForNum("/news/getNewsNum","newsNum");
    //获取慈善项目数据
    showDaysCharityData();
    //获取新闻报道数据
    showDaysNewsData();
    //获取项目进度
    showCauseProgress();
})


function requestForNum(reqUrl,domId) {
    let url = BASE_URL + reqUrl;
    let args = {};
    $.get(url,args,function (responseEntity) {
        //接收后端返回的统一responseEntity接口
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            $("#"+domId).text(responseEntity.data);
        }else{
            layer.msg(responseEntity.message);
        }
    })
}
//获取慈善项目数据
function showDaysCharityData() {
    //获取数据
    let url = BASE_URL + "/causes/getDaysCharityData";
    let args = {};
    $.get(url,args,function (responseEntity) {
        //接收后端返回的统一responseEntity接口
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //进行展示
            Morris.Bar({
                element: 'graph8',
                data: responseEntity.data,
                xkey: 'period',
                ykeys: [ 'raised'],
                labels: ['raised'],
                xLabelAngle: 40
            });
        }else{
            layer.msg(responseEntity.message);
        }
    })
}
//获取新闻报道数据
function showDaysNewsData() {
//获取数据
    let url = BASE_URL + "/news/getDaysNewsData";
    let args = {};
    $.get(url,args,function (responseEntity) {
        //接收后端返回的统一responseEntity接口
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //进行展示
            Morris.Line({
                element: 'graph9',
                data: responseEntity.data,
                xkey: 'period',
                ykeys: ['published'],
                labels: ['published'],
                parseTime: false
            });
        }else{
            layer.msg(responseEntity.message);
        }
    })
}

function showCauseProgress() {
    //获取数据
    let url = BASE_URL + "/causes/getCauseProgress";
    let args = {};
    $.get(url,args,function (responseEntity) {
        //接收后端返回的统一responseEntity接口
        if(responseEntity.result === "SUCCESS"){
            //获取成功
            //进行展示
            $("#causeProgress").empty();
            let html = "";
            for (let i = 0; i < responseEntity.data.length; i++) {
                let percent = getPercentage(responseEntity.data[i].raised,responseEntity.data[i].goal);

                html += "<tr>\n" +
                    "        <th scope=\"row\">"+Number(i+1)+"</th>\n" +
                    "        <td>"+responseEntity.data[i].title+"</td>\n" ;
                if(responseEntity.data[i].raised <  responseEntity.data[i].goal){
                    html += "<td><span class=\"label label-success\">进行中...</span></td>\n" ;
                }else{
                    html += "<td><span class=\"label label-info\">已完成</span></td>";
                }

                html += "        <td><div class=\"progress progress-striped active\">\n" ;
                if(percent === 100){
                    html += "<div class=\"bar blue\" style=\"width:100%;\">100%</div>";
                }else{
                    html += "<div class=\"bar green\" style=\"width:"+percent+"%;\">"+percent+"%</div>"
                }
                html +="        </div></td>\n" +
                    "     </tr>";
            }
            $("#causeProgress").append(html);
        }else{
            layer.msg(responseEntity.message);
        }
    })
}

//获取活动筹集百分比
function getPercentage(raised,goal) {
    let sum;
    if(raised !== 0){
        sum = Math.floor(raised / goal * 100);
    }else{
        sum = 0;
    }
    return sum;
}