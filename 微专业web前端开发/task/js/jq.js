var type = 10;
var psize = 20;
var pageNo = 1;
var theS = [];
var theL = [];
$(window).resize(function(){
   //位置
    $('.bannerUl').css('left',$(window).width()/2+'px');
    $('.list_2 > img').css('width',($(window).width()-24)/5+'px');
})
$(document).ready(function(){
    //位置以及一些初始样式
    $('.bannerUl').css('left',$(window).width()/2+'px');
    $('.list_2 > img').css('width',($(window).width()-32)/5+'px');
    $('.yema > li').addClass('yema_css1');
    $('.yema > li').eq(1).removeClass('yema_css1').addClass('yema_css2');
    $('#shadow').css("width",$(document).width()+'px');
    $('#shadow').css("height",$(document).height()+'px');
    getData(type, pageNo, psize);
    if(getCookie("isHint")==1){
        $('#top').css('display','none');
    }
    if(getCookie("followSuc")=="true"){
        $('.yet-follow').css('display','none');
        $('.hc_span2').css('display','none');
        $('.hc_span3').css('display','inline-block')
    }
})
$(function(){
    //点击关注后的登录事件
    $('.yet-follow').click(function(){
        if(getCookie("logSuc")=="true"){
            getFollow();
        }else{
            var w = ($(window).width()-300)/2;
            var h = ($(window).height()-220)/2;
            onShadow();//弹出遮罩
            $('#logIn').css("left",w+'px');
            $('#logIn').css("top",h+'px');//确定登录框的位置
            $('#logIn').css("display","block");
        }
    })
    //验证登录名和密码
    $('input[name="user"]').focus(function(){
        $(this).css("color","#000").val("");
    })
    $('input[name="password"]').focus(function(){
        $(this).val("").attr("type","password");
    })
    $('input[name="btn"]').click(function(){
        var $user = md5($('input[name="user"]').val());
        var $pass = md5($('input[name="password"]').val());
        setCookie("logSuc","true",7);//设置登录cookie
        $.ajax({
            type:"get",
            url:'http://study.163.com/webDev/login.htm?userName='+$user+'&password='+$pass,
            success:function(data){
                if(data==1){//返回为1说明登录成功，设置关注
                    getFollow();
                }else{
                    alert("账号或者密码错误，请重新输入");
                    $('input[name="user"]').css("color","#999999").val("账号");
                    $('input[name="password"]').attr("type",'text').css("color","#999999").val("密码");
                }
            }
        })
    })

    //点击关闭按钮关闭登录窗口
    $('.off').click(function(){
        offShadow();//关闭遮罩
        $('#logIn').css("display","none");
        $('input[name="user"]').css("color","#999999").val("账号");
        $('input[name="password"]').css("color","#999999").val("密码");
    })
    //取消关注
    $('.hc_span3').mouseover(function(){
        $(this).text("取消关注").css("background","#D1D4D3");
    }).mouseout(function(){
        $(this).text("√ 已关注").css("background","#EAE9E9");
    }).click(function(){
        $(this).css("display","none").text("√ 已关注").css("background","#EAE9E9");
        $('.yet-follow').css("display","inline");
        $('.hc_span2').css("display","inline");
        removeCookie("followSuc");
    })
    //轮播
    var timer = null;
    var i = 2;
    timer = setInterval(banner,5000);

    $('.banner > a').hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(banner,5000);
    })
    function banner(){
        $('.bannerUl > li').css("background","#fff");
        $('.banner > a').css('display','none');
        if(i<2){
            i++
        }else{
            i=0;
        }
        $('.banner > a').eq(i).css('display','blcok').fadeIn(500);
        $('.bannerUl > li').eq(i).css("background","#000");
    }

    //tab选项切换获取psize
    $('.m_left > span').click(function(){
        $('.m_left > span').removeClass('active1').addClass('active2');
        $(this).removeClass('active2').addClass('active1');
        type = ($(this).index()+1)*10;
        getData(type, pageNo, psize);
    })
    //tab选项切换获取pageNo
    $('.yema > li').click(function(){
        $('.yema > li').removeClass('yema_css2').addClass('yema_css1');
        if($(this).index()==0){
            if(pageNo>1){
                pageNo--;
            }
        }else if($(this).index()==9){
            if(pageNo<8){
                pageNo++;
            }
        }else{
            pageNo = $(this).index();
        }
        $('.yema > li').eq(pageNo).addClass('yema_css2');
        getData(type, pageNo, psize);
    })


    getDataLeft();

})

//根据类型和\,页数和数量获取m_left数据
function getData(tp, pg, num) {

    $.ajax({
        type: "get",
        url: 'http://study.163.com/webDev/couresByCategory.htm',
        data: { pageNo: pg, psize: num, type: tp },
        success: function(str) {
            str = eval("(" + str + ")");
            $.each(str, function(i, data) {
                if (i == "list") {
                    theS = data;
                }
            });

            doShow(); //渲染课表内容区
        },
        error: function(str) {
            alert("获取数据失败");
        }
    });
}

//渲染课表内容框
function doShow(){
    $('.tap').html("");
    for(var i = 0,len = theS.length;i<len;i++){
        $('.tap').append("<li></li>");
        if(i%4==0){
            $('.tap > li').eq(i).css("margin-left","0");
        }
        $('.tap > li').eq(i).append('<img src='+theS[i]["middlePhotoUrl"]+' class="list_img1"><p class="p1">'+theS[i]["name"]+'</p><p class="p2">'+theS[i]['provider']+'</p><p class="p3"><img src="imgs/people.png">&nbsp;'+theS[i]['learnerCount']+'</p>');
        if(theS[i]["price"] ==0){
            $('.tap > li').eq(i).append('<p class="p4">免 费</p>');
        }else{
            $('.tap > li').eq(i).append('<p class="p4">￥'+theS[i]["price"]+'.00</p>');
        }
        $('.tap > li').eq(i).append('<div class="fuceng"><img src='+theS[i]["middlePhotoUrl"]+' class="list_img3"><div class="fuceng_r"><a href="http://study.163.com/course/introduction/'+theS[i]["id"]+'.htm"><span>'+theS[i]["name"]+'</span></a><p class="p5"><img src="imgs/people.png">&nbsp;'+theS[i]['learnerCount']+'人在学</p><p>发布者：'+theS[i]['provider']+'<br>分类:'+theS[i]["categoryName"]+'</p></div><div class="fuceng_b"><p>'+theS[i]["description"]+'</p></div></div>');
        $('.tap > li').eq(i).mouseover(function(){
            $(this).children('.fuceng').show();
        }).mouseout(function(){
            $(this).children('.fuceng').hide();
        })
    }
}
//请求关注状态
function getFollow(){
    $.ajax({
        type:"get",
        url:'http://study.163.com/webDev/attention.htm',
        success:function(data){
            if(data==1){
                setCookie('followSuc',true,99999);//记录关注状态
                //设置关注后的样式
                offShadow();//关闭遮罩
                $('#logIn').css("display","none");
                $('input[name="user"]').css("color","#999999").val("账号");
                $('input[name="password"]').attr("type",'text').css("color","#999999").val("密码");
                $('.yet-follow').css('display','none');
                $('.hc_span2').css('display','none');
                $('.hc_span3').css('display','inline-block')
            }
        }
    })
}
//获取m_right的数据
function getDataLeft(){
    $.ajax({
        type:"get",
        url:'http://study.163.com/webDev/hotcouresByCategory.htm',
        success:function(str){
            str = eval("(" + str + ")");
            theL = str;
            showLeft();
            scroll();
        },
        error: function(str) {
            alert("获取数据失败");
        }
    })
}
//渲染页面初始最热排行
function showLeft(){
    $('.ranking').html("");
    for(var i = 0;i<19;i++){
        $('.ranking').append('<li></li>');
        $('.ranking > li').eq(i).css("display","none");
        $('.ranking > li').eq(i).append('<a href="http://study.163.com/course/introduction/'+theL[i]["id"]+'.htm"><img src='+theL[i]["smallPhotoUrl"]+' class="photo"></a><p><span>'+theL[i]["name"]+'</span><br><img src="imgs/people.png" class="list_img2">&nbsp;'+theL[i]["learnerCount"]+'</p>');
    }
    $('.ranking').html($('.ranking').html()+$('.ranking').html());
    for(var z=0;z<10;z++){
        $('.ranking > li').eq(z).css("display","block");
    }
}
//实现每5s滚动最热排行
function scroll(){
    var k = 10;
    setInterval((function(){
        // $('.ranking > li').eq(k-10).css("display","none");
        // $('.ranking > li').eq(k).css("display","block");
        if(k<29){
            $('.ranking > li').eq(k-10).css("display","none");
            $('.ranking > li').eq(k).css("display","block");
            k++;
        }else{
            $('.ranking > li').css("display","none");
            for(var z=0;z<10;z++){
                $('.ranking > li').eq(z).css("display","block");
            }
            k=10;
        }
    }),5000);
}