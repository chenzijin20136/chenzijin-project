
var oList = document.getElementById("list");
var oButtons = document.getElementById("buttons");
var oA = oList.getElementsByTagName("a");
var oSpans = document.getElementById("buttons").getElementsByTagName("span");
var oImages = document.getElementById("images");
oImages.innerHTML += oImages.innerHTML;
var oImagesPart = oImages.getElementsByTagName("img");
var oRemindClose = document.getElementById("remind_close");
var oRemindWrap = document.getElementById("remind_wrap");
var oPlayer = document.getElementById("player");
var oVedio = document.getElementById("vedio");
var oVedio_start = document.getElementById("vedio_start");
var oClose_player = document.getElementById("close_player");
var oRightBottom = document.getElementById("right_bottom");
var oOver = document.getElementById("over");
var oPopup = document.getElementById("popup");
var oHeaderActive = document.getElementById("headerActive");
var oLogoToAttention = document.getElementById("attention");
var oCloseAttention = document.getElementById("close_attention");
var oUser = document.getElementById("user");
var oPassWord = document.getElementById("password");
var oBtn3 = document.getElementById("button3");
var oContentLeft = document.getElementById("content_left");
var oProduct = document.getElementById("product");
var oProgramme = document.getElementById("programme");
var oLeftWrap = document.getElementById("leftWrap");
var oOne = document.getElementById("one"),
    oTwo = document.getElementById("two"),
    oThree = document.getElementById("three"),
    oFour = document.getElementById("four"),
    oFive = document.getElementById("five"),
    oSex = document.getElementById("sex"),
    oSeven = document.getElementById("seven"),
    oEight = document.getElementById("eight"),
    oNine = document.getElementById("nine"),
    oTen = document.getElementById("ten");

window.onresize = function(){//当屏幕的宽度改变时
    intBannerSize();//初始化轮播图的位置
    intButtonLeft();//初始化按钮的位置
    intPlayerLeft();//改变palyer的位置
    intPopupLeft();//改变popup的left
}


//当屏幕宽度变化时，改变banner的left
function intBannerSize(){
    var oClientWidth = document.documentElement.clientWidth;//保存可视区域的宽度
    if(oClientWidth <= 1652){//当可视区域的宽度小于banner图的宽度时
    oList.style.left = -(1652 - oClientWidth)/2 + "px";
    }
}
//当屏幕宽度变化时，改变popup的left
function intPopupLeft(){
    oPopup.style.left = (document.documentElement.clientWidth-500)/2 + "px";
    oPopup.style.top = (document.documentElement.clientHeight - 500)/2 +"px";
}
//当屏幕宽度变化时，改变banner的left
function intButtonLeft(){
    oButtons.style.left = document.documentElement.clientWidth/2 + "px";
}

//改变palyer的位置
function intPlayerLeft(){
    oPlayer.style.left = (document.documentElement.clientWidth-oPlayer.offsetWidth)/2 + "px";
    oPlayer.style.top = (document.documentElement.clientHeight - oPlayer.offsetHeight)/2 +"px";
}

//遮罩层出现
function showOver(){
    oOver.style.position = "fixed";
    oOver.style.backgroundColor = "#000";
    oOver.style.opacity = 0.75;
    oOver.style.filter ='alpha(opacity:'+75+')';
    oOver.style.width = document.documentElement.clientWidth + "px";
    oOver.style.height = document.documentElement.clientHeight + "px";
    oOver.style.top = 0;
    oOver.style.display = "block";
}

//player显示函数
function showPlayer(){
    oPlayer.style.display = "block";
    oPlayer.style.zIndex = 1;
    showOver();
}
//player隐藏函数
function inhide(){
    oPlayer.style.display = "none";
    oOver.style.display = "none";
}
oVedio.onclick=function(){
    showPlayer();
    intPlayerLeft();
};
oClose_player.onclick = function(){
    inhide();
}

//透明度逐渐增加函数
function opacityAdd(obj,iTarget,alpha){

    clearInterval(obj.timer);

    obj.timer=setInterval(function (){
        var iSpeed=0;

        if(alpha<iTarget)
        {
            iSpeed=1;
        }
        else
        {
            iSpeed=-1;
        }

        if(alpha==iTarget)
        {
            clearInterval(obj.timer);
        }
        else
        {
            alpha+=iSpeed;

            obj.style.filter='alpha(opacity:'+alpha+')';
            obj.style.opacity=alpha/100;
        }
    }, 10);
}

//banner计时器函数
var i=0;
function timerBanner(){
    if(i<oA.length-1){
            opacityAdd(oA[i],0,100);
            opacityAdd(oA[i+1],100,0);
            oSpans[i].className = "button_active";
            i++;
            oSpans[i-1].className = "";
            oSpans[i].className = "button_active";
        }else{
            opacityAdd(oA[i],0,100);
            oSpans[i].className = "button_active";
            i=0;
            opacityAdd(oA[i],100,0);
            oSpans[oA.length-1].className = "";
            oSpans[i].className = "button_active";
        }
}

//banner开始淡入淡出，圆点随着滚动
function bannerStart(){
    var timer = null;
    timer = setInterval("timerBanner()",5000);
    oList.onmouseover = function(){
        clearInterval(timer);
    }
    oList.onmouseout= function(){
        timer = setInterval("timerBanner()",5000);
    }
}

//images无缝滚动函数
function imgMove(){
    var iSpeed = 2;
    var timer = null;
    function imgTimer(){
        oImages.style.left = oImages.offsetLeft + iSpeed + "px";
        if(oImages.offsetLeft < -1616){
            oImages.style.left = 0 + "px";
        }else if(oImages.offsetLeft > 0){
            oImages.style.left = -1616 + "px";
        }
    }
    timer = setInterval(imgTimer,10);

    //鼠标移入
    oImages.onmouseover = function(){
        clearInterval(timer);
    }
    //鼠标移出
    oImages.onmouseout = function(){
        timer = setInterval(imgTimer,10);
    }
}

//设置cookie函数
function setCookie(name,value,iDay){
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}

//读取cookie函数
function getCookie(name){
    var arr = document.cookie.split("; ");
    var i=0;
    for(i=0;i<arr.length;i++){
        var arr2 = arr[i].split('=');
        if(arr2[0] == name){
            return arr2[1];
        }
    }
    return '';
}

//删除cookie函数
function removeCookie(name){
    setCookie(name,'1',-1);
}

//关闭顶部通知条
oRemindClose.onclick = function(){
    setCookie("myCookie","myValue",1);
    oRemindWrap.style.display = "none";
}

//判断是否隐藏提醒栏
function closeRemind(){
    if(getCookie("myCookie") == "myValue"){
        oRemindWrap.style.display = "none";
    }
}

//创建跨浏览器对象
var EventUtil = {
    //添加事件
    addHandler:function(element,type,handler){
        if(element.addEventLister){//是否存在DOM2级方法
            element.addEventLister(type,handler,false);
        }else if(element.attachEvent){//存在的是IE方法
            element.attachEvent("on" +type,handler);
        }else{//DOM0级方法
            element["on" + type] = handler;
        }
    },
    //移除事件
    removeHandler : function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.datachEvent){
            element.datachEvent("on" + type,handler);
        }else{
            element["on" + type] = null;
        }
    },
    //返回对event对象的引用
    getEvent : function(event){
        return event ? event : window.event;
    },
    //返回事件的目标
    getTarget : function(event){
        return event.target || event.srcElement;
    },
    //取消事件的默认行为
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    }
};

//创建XHR对象
function createXHR(){
    if(typeof XMLHttpRequest != "undefined"){//检测原生XHR对象是否存在
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject != "undefined"){//检测ActiveX对象
        if(typeof arguments.callee.activeXString != "string"){
            var versions = ["MSXML2.XMLhttp.6.0", "MSXML2.XMLhttp.3.0", "MSXML2.XMLhttp"];
            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else{
        throw new Error("No XHR object available.");
    }
}
//获取热门排行内容
var xhr = createXHR();
//为xhr对象添加事件
EventUtil.addHandler(xhr,"load",function(){
   //判断浏览器操作到哪一步
   if(xhr.readyState == 4){//读取完成
        if((xhr.status >= 200 && xhr.status < 300)||xhr.status == 304){
            var jsonText = JSON.parse(xhr.responseText);
            //alert(jsonText[0]["smallPhotoUrl"]);
            //把返回的文本解析为原生的JS值
            var oRight_bottom = document.getElementById("right_bottom");
            //console.log(jsonText.length);20
            for(var i=0;i<jsonText.length;i++){
                var oRightImg = document.createElement("img");
                oRightImg.src = jsonText[i]["smallPhotoUrl"];
                var oRightA = document.createElement("a");
                oRightA.innerHTML =jsonText[i]["name"];
                var oRightSpan = document.createElement("span");
                oRightSpan.innerHTML = jsonText[i]["learnerCount"];
                var oRightDiv = document.createElement("div");
                oRightDiv.appendChild(oRightImg);
                oRightDiv.appendChild(oRightA);
                oRightDiv.appendChild(oRightSpan);
                oRightDiv.className="bottom_part";
                oRight_bottom.appendChild(oRightDiv);

            }
            oRight_bottom.innerHTML += oRight_bottom.innerHTML;
        }
   }
});

//关注函数
function ologoAttention(){
    var oLogo = getCookie("loginSuc");
    //没有账号时
    if(oLogo == ""){
        //弹出登录框
        oPopup.style.display = "block";
        oPopup.style.zIndex = 1;
        showOver();
        oBtn3.onclick = function(){
            checkText();
        };
    }else{//有账号时

        //导航关注
        var oAttention = createXHR();

        oAttention.timeout = 2000;//将超时设置为2s
        oAttention.ontimeout = function(){
            alert("Request3 did not return in five seconds");
        };
        oAttention.open("get","http://study.163.com/webDev/attention.htm",true);
        //xhr.overrideMimeType("text/html");//重写XHR响应的MIME类型，可以保证把响应当作XML而非纯文本来处理
        oAttention.send(null);

        //为oLessons对象添加事件
        EventUtil.addHandler(oAttention,"load",function(){
           //判断浏览器操作到哪一步
           if(oAttention.readyState == 4){//读取完成
                if((oAttention.status >= 200 && oAttention.status < 300)||oAttention.status == 304){
                    var jsonText2 = JSON.parse(oAttention.responseText);
                    //console.log(jsonText2);
                    if(jsonText2 == 1){
                        setCookie("followSuc","fensAdd",30);
                        oHeaderActive.style.display = "inline-block";
                        oLogoToAttention.style.display = "none";
                    }
                }
           }
        });
    }
}

//取消关注函数
function ologoNoAttention(){
    oPopup.style.display = "none";
    oOver.style.display = "none";
    oHeaderActive.style.display = "none";
    oLogoToAttention.display = "block";
}

//点击关注按钮
oLogoToAttention.onclick = function(){
    ologoAttention();

}
//点击取消关注
oCloseAttention.onclick = function(){
    ologoNoAttention();
    removeCookie("followSuc");
    oHeaderActive.style.display = "none";
    oLogoToAttention.style.display = "inline-block";
}
document.getElementById("delete").onclick = function(){
    ologoNoAttention();
}
//验证用户名和密码的函数
function checkText(){
    var oUserContent = oUser.value.trim();
    var oPassWordContent = oPassWord.value.trim();
    if(oUserContent == ""){
        alert("输入的用户名不能为空！");
        return;
    }
    if(!oUserContent.match(/[\u4e00-\u9fa5]/) && !oUserContent.match(/[a-zA-Z]/)){
        alert("输入的用户名要为英文或者汉字！");
        return;
    }
    if(oPassWordContent == ""){
        alert("输入的密码不能为空！");
        return;
    }
    if(!oPassWordContent.match(/\S{6,}/)){
        alert("输入的密码至少六位！");
        return;
    }

    //用户登录获取
    var oUserLogo = createXHR();
    var ID = oUser.value.trim();
    var pSword = oPassWord.value.trim();
    ID = hex_md5(ID);
    pSword = hex_md5(pSword);
    oUserLogo.timeout = 2000;//将超时设置为2s
    oUserLogo.ontimeout = function(){
        alert("Request1 did not return in five seconds");
    };
    oUserLogo.open("get","http://study.163.com/webDev/login.htm?userName="+ID+"&password="+pSword+"",true);
    oUserLogo.send(null);
    EventUtil.addHandler(oUserLogo,"load",function(){
       //判断浏览器操作到哪一步
       if(oUserLogo.readyState == 4){//读取完成
            if((oUserLogo.status >= 200 && oUserLogo.status < 300)||oUserLogo.status == 304){
                var jsonText3 = JSON.parse(oUserLogo.responseText);
                if(jsonText3 == 1){
                    alert("恭喜你，登陆成功！！！");
                    setCookie("loginSuc","yonghuming",30);
                    oPopup.style.display = "none";
                    oOver.style.display = "none";

                }else if(jsonText3 == 0){
                    alert("不好意思，请再来一次");
                    oUser.value = "";
                    oPassWord.value = "";
                }
            }
       }
    });
}

//右边的最热排行进行向上轮播
function rightBottomBanner(){
    var iSpeed = 70;
    var timer = null;
    function bannerTimer(){
        oRightBottom.style.top = oRightBottom.offsetTop - iSpeed + "px";
        if(oRightBottom.offsetTop < -1400){
            oRightBottom.style.top = 0 + "px";
        }else if(oRightBottom.offsetTop > 0){
            oRightBottom.style.top = -1400 + "px";
        }
    }
    timer = setInterval(bannerTimer,2000);
}

//获取课程表内容
var oLessons = createXHR();
//为oLessons对象添加事件
EventUtil.addHandler(oLessons,"load",function(){
    oLessonContent();//渲染课程表内容函数
});

//获取课程表函数
function oLessonsFun(){
    //设置超时设定
    // oLessons.timeout = 2000;//将超时设置为2s
    // oLessons.ontimeout = function(){
    //     alert("Request2 did not return in five seconds");
    // };
    oLessons.open("get","http://study.163.com/webDev/couresByCategory.htm?pageNo="+page+"&psize="+pageSize+"&type="+type+"",true);
    //xhr.overrideMimeType("text/html");//重写XHR响应的MIME类型，可以保证把响应当作XML而非纯文本来处理
    oLessons.send(null);
}

//渲染课程表内容函数
function oLessonContent(){
   //判断浏览器操作到哪一步
   if(oLessons.readyState == 4){//读取完成
        if((oLessons.status >= 200 && oLessons.status < 300)||oLessons.status == 304){
            var jsonText1 = JSON.parse(oLessons.responseText);

            //console.log(jsonText1);
            for(var i in jsonText1){
                if(i == "list"){
                   for(var j in jsonText1[i]){
                    //console.log(jsonText1[i][j].name);
                    var oDiv = document.createElement("div");
                    oDiv.className = 'left_part';
                    var oImg = document.createElement("img");
                    oImg.src = jsonText1[i][j].middlePhotoUrl;
                    var oA = document.createElement("a");
                    oA.innerHTML = jsonText1[i][j].name;
                    var oP = document.createElement("p");
                    oP.innerHTML = jsonText1[i][j].provider;
                    var oSpan = document.createElement("span");
                    oSpan.innerHTML = jsonText1[i][j].learnerCount;
                    var oH4 = document.createElement("h4");
                    oH4.innerHTML = jsonText1[i][j].price;

                    oDiv.appendChild(oImg);
                    oDiv.appendChild(oA);
                    oDiv.appendChild(oP);
                    oDiv.appendChild(oSpan);
                    oDiv.appendChild(oH4);

                    oLeftWrap.appendChild(oDiv);
                   }
                }
            }
        }
   }
}

var page = 1;
var pageSize = 20;
var type = 10;
//点击产品设计

oProduct.onclick = function(){
    type = 10;
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
    oProgramme.style.color = "#666";
    oProgramme.style.backgroundColor = "#fff";
    oProduct.style.color = "#fff";
    oProduct.style.backgroundColor = "#39a030";
    document.getElementById("productA").style.color = "#fff";
    document.getElementById("programmeA").style.color = "#666";
}
//点击编程语言
oProgramme.onclick = function(){
    type = 20;
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
    oProduct.style.color = "#666";
    oProduct.style.backgroundColor = "#fff";
    oProgramme.style.color = "#fff";
    oProgramme.style.backgroundColor = "#39a030";
    document.getElementById("productA").style.color = "#666";
    document.getElementById("programmeA").style.color = "#fff";
}

oOne.onclick = function(){
    if(page == 2){
        page = 1;
        oTwo.className = "pageActive";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 3){
        page = 2;
        oThree.className = "pageActive";
        oTwo.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 4){
        page = 3;
        oFour.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 5){
        page = 4;
        oFive.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 6){
        page = 5;
        oSex.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 7){
        page = 6;
        oSeven.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 8){
        page = 7;
        oEight.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
}
oTwo.onclick = function(){
    page = 1;
    this.className = "pageActive";
    oThree.className = "";
    oFour.className = "";
    oFive.className = "";
    oSex.className = "";
    oSeven.className = "";
    oEight.className = "";
    oNine.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oThree.onclick = function(){
    page = 2;
    this.className = "pageActive";
    oTwo.className = "";
    oFour.className = "";
    oFive.className = "";
    oSex.className = "";
    oSeven.className = "";
    oEight.className = "";
    oNine.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oFour.onclick = function(){
    page = 3;
    this.className = "pageActive";
    oTwo.className = "";
    oThree.className = "";
    oFive.className = "";
    oSex.className = "";
    oSeven.className = "";
    oEight.className = "";
    oNine.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oFive.onclick = function(){
    page = 4;
    this.className = "pageActive";
    oTwo.className = "";
    oThree.className = "";
    oFour.className = "";
    oSex.className = "";
    oSeven.className = "";
    oEight.className = "";
    oNine.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oSex.onclick = function(){
    page = 5;
    this.className = "pageActive";
    oTwo.className = "";
    oThree.className = "";
    oFour.className = "";
    oFive.className = "";
    oSeven.className = "";
    oEight.className = "";
    oNine.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oSeven.onclick = function(){
    page = 6;
    this.className = "pageActive";
    oTwo.className = "";
    oThree.className = "";
    oFour.className = "";
    oFive.className = "";
    oSex.className = "";
    oEight.className = "";
    oNine.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oEight.onclick = function(){
    page = 7;
    this.className = "pageActive";
    oTwo.className = "";
    oThree.className = "";
    oFour.className = "";
    oFive.className = "";
    oSex.className = "";
    oSeven.className = "";
    oNine.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oNine.onclick = function(){
    page = 8;
    this.className = "pageActive";
    oTwo.className = "";
    oThree.className = "";
    oFour.className = "";
    oFive.className = "";
    oSex.className = "";
    oSeven.className = "";
    oEight.className = "";
    oLeftWrap.innerHTML = "";
    oLessonsFun();//获取课程表函数
    oLessonContent();//渲染课程表内容函数
}
oTen.onclick = function(){
    if(page == 1){
        page = 2;
        oThree.className = "pageActive";
        oTwo.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 2){
        page = 3;
        oFour.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 3){
        page = 4;
        oFive.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 4){
        page = 5;
        oSex.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSeven.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 5){
        page = 6;
        oSeven.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oEight.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 6){
        page = 7;
        oEight.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oNine.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
    else if(page == 7){
        page = 8;
        oNine.className = "pageActive";
        oTwo.className = "";
        oThree.className = "";
        oFour.className = "";
        oFive.className = "";
        oSex.className = "";
        oSeven.className = "";
        oEight.className = "";
        oLeftWrap.innerHTML = "";
        oLessonsFun();//获取课程表函数
        oLessonContent();//渲染课程表内容函数
    }
}


//给window设置load事件
EventUtil.addHandler(window,"load",function(event){
    //设置超时设定
    // xhr.timeout = 2000;//将超时设置为2s
    // xhr.ontimeout = function(){
    //     alert("Request1 did not return in five seconds");
    // };
    xhr.open("get","http://study.163.com/webDev/hotcouresByCategory.htm",true);
    //xhr.overrideMimeType("text/html");//重写XHR响应的MIME类型，可以保证把响应当作XML而非纯文本来处理
    xhr.send(null);
    oLessonsFun();//获取课程表函数

    intBannerSize();//初始化轮播图的位置
    intButtonLeft();//初始化按钮的位置
    bannerStart();//banner淡出淡出
    imgMove();//images无缝滚动
    closeRemind();//判断是否隐藏提醒栏
    intPlayerLeft();//改变palyer的位置
    rightBottomBanner();//右边的最热排行进行向上轮播
    intPopupLeft();
    oTwo.className = "pageActive";
});

