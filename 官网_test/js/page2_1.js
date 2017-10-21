var oPartOne = document.getElementById("partOne");
var oNav = document.getElementById("nav");
var oCanva = document.getElementById("particles-js");
var oGroup1 = document.getElementById("group1"),
    oGroup2 = document.getElementById("group2"),
    oGroup3 = document.getElementById("group3"),
    oGroup4 = document.getElementById("group4"),
    oGroup5 = document.getElementById("group5");
var oWeb = document.getElementById("web"),
    ohouT = document.getElementById("houT"),
    ochanP = document.getElementById("chanP"),
    oyunY = document.getElementById("yunY"),
    osheJ = document.getElementById("sheJ"),
    oxingZ = document.getElementById("xingZ");

oCanva.style.height = document.documentElement.clientHeight + "px";
oCanva.style.width = document.body.scrollWidth + "px";
oPartOne.style.height = document.documentElement.clientHeight + "px";
oPartOne.style.marginTop = -document.documentElement.clientHeight + "px";
oNav.style.width = document.documentElement.clientWidth - 50 + "px";
oNav.style.position = "fixed";


i=0;
oImage=document.getElementById("picture").getElementsByTagName("img");
oImageL=oImage.length;
var width = document.body.scrollWidth;
var height = document.body.scrollHeight;
var timer = null;

//绕着中心旋转
function rotateOne(){
    for(var index=0;index<oImageL;index++){
        oImageS=oImage[index].style;
        oImageS.position='absolute';
        var speed = 0.005;
        var interV = 2*Math.PI/speed/oImageL;
        oImageS.left = Math.sin(i*speed+index*interV*speed)*(width/3)+width/2;      // the speed is change's range
        oImageS.top = Math.cos(i*speed+index*interV*speed)*(height/3)+height/2;
    }
    i++;
}
timer=setInterval("rotateOne()",10);

//鼠标移入移出图标
for(var j=0;j<oImage.length;j++){

    oImage[j].onmouseover = function(){
        clearInterval(timer);

        this.className = "actived";
        this.style.height = 172;
        this.style.width = 200;
        if(this.id == "group1"){
            oWeb.className += " messActive";
        }
        if(this.id == "group2"){
            ohouT.className +=" messActive";
        }
        if(this.id == "group3"){
            ochanP.className +=" messActive";
        }
        if(this.id == "group4"){
            oyunY.className +=" messActive";
        }
        if(this.id == "group5"){
            osheJ.className +=" messActive";
        }
        if(this.id == "group6"){
            oxingZ.className +=" messActive";
        }
    }
    oImage[j].onmouseout = function(){
        // console.log(this.id);
        timer=setInterval("rotateOne()",10);
        this.className = "";
        this.style.height = 86;
        this.style.width = 100;
        if(this.id == "group1"){
            oWeb.className = "messages";
        }
        if(this.id == "group2"){
            ohouT.className = "messages";
        }
        if(this.id == "group3"){
            ochanP.className = "messages";
        }
        if(this.id == "group4"){
            oyunY.className = "messages";
        }
        if(this.id == "group5"){
            osheJ.className = "messages";
        }
        if(this.id == "group6"){
            oxingZ.className = "messages";
        }
    }
}

