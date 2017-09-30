 var oBtn1 = document.getElementById('btn1'),//开始游戏
    oBtn2 = document.getElementById('btn2'),//重新开始
    oOripic = document.getElementById('oripic'),//原图
    oChoose = document.getElementById('choose'),//选择难度
    oUl = document.getElementById('ul1'),//拼图部分
    oP = document.getElementsByTagName('span');
var count = 0;//记录步数
var theNull = 0;//记录空格所在位置
var timer = null;
window.onload = function(){
    generate();//生成不同难度的游戏
};
//移动图片
function move(x){
    var oPic = oUl.getElementsByTagName('li');//获取每张碎片
    oPic[theNull].innerHTML = oPic[x].innerHTML;//点击图片。图片与空格的位置交换
    oPic[x].innerHTML = '';
    theNull = x;
}


//初始化游戏
function start(x){
    for(var i=0;i<5000;i++){
        switch(parseInt(Math.random()*4)){
            case 0:if(theNull >= x+3){
                move(theNull - 3);
            }
            break;
            case 1:if(theNull <= (x+2)*(x+3) - 1){
                move(theNull + 3);
            }
            break;
            case 2:if(theNull%(x+3) != 0){
                move(theNull - 1);
            }
            break;
            case 3:if(theNull%(x+3) != x+2){
                move(theNull + 1);
            }
            break;
        }
    }
}

//生成不同难度的游戏
function generate(x){
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        oUl.innerHTML = "";
        var oMainPic = document.getElementById('oripic');
        oMainPic.src = "images"+(x+1)+"/main.jpg";
        (function (){
            for(var i=1,len1=(x+3)*(x+3);i<=len1;i++){
                var oLi = document.createElement('li');
                oLi.style.width = 600/(x+3)+"px";
                oLi.style.height = 600/(x+3)+"px";
                oLi.innerHTML = "";
                //最后一张只有li没有图
                if(i==len1){
                    oUl.appendChild(oLi);
                    break;
                }
                var oImg = document.createElement('img');
                oImg.style.width = 600/(x+3)+"px";
                oImg.style.height = 600/(x+3)+"px";
                var sNumber = i>9?i:'0'+i;
                oImg.src =  "images"+(x+1)+"/show_"+sNumber+".jpg";
                oLi.appendChild(oImg);
                oUl.appendChild(oLi);
            }
        })();
        theNull=(x+3)*(x+3)-1;
        start(x); //调用start函数初始化游戏
        tick(x);
        oP[1].innerHTML=0;
        count=0;
        oP[2].innerHTML = count;
        timer = setInterval(function (){
            oP[1].innerHTML = parseInt(oP[1].innerHTML)+1+"";
        },1000);
    }

//点击开始新游戏按钮
oBtn1.onclick = function(){
    switch(oChoose.value){
        case "简单":generate(0);
        break;
        case '中等':generate(1);
        break;
        case '困难':generate(2);
        break;
    }
};

//点击重新开始按钮
oBtn2.onclick = function(){
    switch(oChoose.value){
        case '简单':generate(0);
        break;
        case '中等':generate(1);
        break;
        case '困难':generate(2);
        break;
    }
};

//判断是否完成拼图
function judge(x){
        // alert(x);
        var oLis = oUl.getElementsByTagName('li');
        var s=0;
        // alert(s);
        for(var i=0,len=oLis.length-1;i<len;i++){
            if(!oLis[i].firstChild){
                return;
            }
            else{
                oTheImg = oLis[i].firstChild;
            }
            var sNumber = i>=9?(i+1):'0'+(i+1);
            //alert(oTheImg.src.substr(oTheImg.src.length-19)+"\nimages"+(x+1)+"/show_"+sNumber+".jpg");
            //alert("images"+(x+1)+"/show_"+sNumber+".jpg");
            if(oTheImg.src.substr(oTheImg.src.length-19) != "images"+(x+1)+"/show_"+sNumber+".jpg"){
                s++;
                break;
            }
        }
        //alert(s);
        if(s==0){
            setTimeout(function (){
            alert("恭喜您完成挑战!\n用时"+oP[1].innerHTML+"秒\n步数："+oP[2].innerHTML
            +"\n点击确认重新开始");
            start(x);
            oP[1].innerHTML = 0;
            count=0;
            oP[2].innerHTML = count;
            },30);
        }
    }

//给每张拼图添加点击事件
function tick(x){
    var oPic = oUl.getElementsByTagName('li'); //游戏中的图片集
        for(var i=0,len=oPic.length;i<len;i++){
            // alert('xxx');
            oPic[i].index = i;
            oPic[i].onclick = function (){
                if(this.index<len-(x+3)&&this.index+(x+3)==theNull){
                    move(this.index);
                    count++;
                    oP[2].innerHTML = count;
                    judge(x);
                }
                else if(this.index>=(x+3)&&this.index-(x+3)==theNull){
                    move(this.index);
                    count++;
                    oP[2].innerHTML = count;
                    judge(x);
                }
                else if(this.index%(x+3)!=(x+2)&&this.index+1==theNull){
                    move(this.index);
                    count++;
                    oP[2].innerHTML = count;
                    judge(x);
                }
                else if(this.index%(x+3)!=0&&this.index-1==theNull){
                    move(this.index);
                    count++;
                    oP[2].innerHTML = count;
                    judge(x);
                }
            };
        }
}
