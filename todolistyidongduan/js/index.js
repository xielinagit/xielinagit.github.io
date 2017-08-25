//判断限制输入
$("#text").on("keydow keyup",function(){
    var l=$(this).val().length;
    if(l>40){
        l=40;
        alert("字数已经超过限制，最多可以写"+l+"个");
        $(this).val(function(index,value){
            return value.slice(0,100);
        });

    }
    $(".notice span").text(function(){
        return l<10?"0"+l:l;
    });
});
//点击提交
$(".anniu").click(function(){
    var val=$("#text").val();
    if(val===""){
        alert("内容不能为空");
        return;
    };
    var data=getData();
    var date=new Date();
    var time=date.getTime();
    data.push({text:val,time:time,isDnone:false,isStar:false,isDelete:false});
    saveData(data);
    $("#text").val("");
    $(".notice span").text("00");
    location.reload();
    // reWrite();
    alert("添加成功");
})
//关闭添加界面
$(".close").click(function(){
    $(".add").hide(300);
    $(".wait").slideDown(300);
})
//获取信息
function getData(){
    if(localStorage.todo){
        return JSON.parse(localStorage.todo);
    }else{
        return [];
    }
}
//保存信息
function saveData(data){
    localStorage.todo=JSON.stringify(data);
}
//重绘页面
function reWrite(){
    $(".item ul").empty();
    var data=getData();
    var str1="",str2="";
    $.each(data,function(index,ele){
        if(ele.isDnone===false){
            str1+=`<li id="${index}">
                        <div class="top">
                            <input type="checkbox">
                            <p>${ele.text}</p>
                        </div>
                        <div class="bottom">
                            <time>${time(ele.time)}</time>
                    `;
            if(ele.isStar){
                str1+="<i class='active iconfont'>&#xe6b8;</i></div></li>"
            }else{
                str1+="<i class='iconfont'>&#xe6b8;</i></div></li>"
            }
        }else{
            str2+=`<li id="${index}">
                        <div class="top">
                            <input type="checkbox">
                            <p>${ele.text}</p>
                        </div>
                        <div class="bottom ">
                            <time>${time(ele.time)}</time>
                    `;
            if(ele.isStar){
                str2+="<i class='active iconfont'>&#xe6b8;</i></div></li>"
            }else{
                str2+="<i class='iconfont'>&#xe6b8;</i></div></li>"
            }
        }
    });
    $(".wait ul ").html(str1);
    $(".done ul").html(str2);
}
reWrite();


//处理时间格式的函数
function time(ms){
    var date=new Date();
    date.setTime(ms);
    var year=date.getFullYear();
    var month=addZero(date.getMonth()+1);
    var day=addZero(date.getDay());
    var hour=addZero(date.getHours());
    var min=addZero(date.getMinutes());
    var sec=addZero(date.getSeconds());
    return year+"/"+month+"/"+day+"/"+hour+"/"+min+"/"+sec;
}
function addZero(num){
    return num<10?"0"+num:num;
}
//选项效果

$(".xiangmu .img").click(function(){
    $(".add").hide();
    var index=$(this).parent().index();
    // $(".xuan").slideUp().eq(index).slideDown();
    $(".xuan").hide().eq(index).show();
});


//移动到已完成的事项
$(".anniu1").click(function(){
    var data=getData();
    $(".wait .item li").each(function(){
        if($(this).find("input").prop("checked")){
            var index=$(this).attr("id");
            data[index].isDnone=true;
        }
    })
    saveData(data);
    reWrite();
})
//跳转到添加
//删除已完成
$(".anniu2").click(function(){
    var data=getData();
    $(".done .item li").each(function(){
        if($(this).find("input").prop("checked")){
            var index=$(this).attr("id");
            data[index].isDelete=true;
        }
    });
    data=data.filter(function(ele){
        return !ele.isDelete;
    })
    saveData(data);
    reWrite();
})



//重要事项
$(".wait ul").on("click","i",function(){
    var data=getData();
    var index=$(this).parent().parent().attr("id");
    console.log($(this).parent().parent())
    data[index].isStar=!data[index].isStar;
    saveData(data);
    reWrite();
})

// $(".wait ul").on("click","p",function () {
//     alert($(this).html());
// })


$(".xuan ul").on("click","p",function(){
    var text=$(this).text();
    $(".chakan p").text(text);
    $(".chakan").slideDown(600);
});
$(".chakan span").click(function(){
    $(this).parent().slideUp(600);
})
