var box = document.querySelector('#box');
var slide = document.querySelector('.slide');
var arraw = document.querySelector('.arraw');
var lis = document.querySelectorAll('li');
var content = document.querySelector("#content");
var json = [ //  包含了5张图片里面所有的样式
    { //  1
        width: 400,
        top: 20,
        left: 100,
        opacity: 20,
        z: 2,
        id: 1,
        con:'我们完成的是经验交流，是知识分享，是分享人生。不是演讲，不是授课，不再只是被动接收，交流的过程中是说友和听友两方思想的碰撞，灵魂的交流，达到双赢的共享'
    },
    { // 2
        width: 600,
        top: 70,
        left: 50,
        opacity: 60,
        z: 3,
        id: 2,
        con:'不同档次，六种类别，八种岗位，海量免费优质课程，各大名企优秀导师，任你挑选，牛逼的人都在这里'
    },
    { // 3
        width: 800,
        top: 100,
        left: 200,
        opacity: 100,
        z: 4,
        id: 3,
        con:'校园互联网+“微超市”平台，全新模式O2O,方便大学生在生活中获得价廉物美的产品，享受更加快捷和便利的服务'
    },
    { // 4
        width: 600,
        top: 70,
        left: 550,
        opacity: 60,
        z: 3,
        id: 4,
        con:'我们的故事还在继续，有梦想的你愿意加入吗？...等你待续...'
    },
    { //5
        width: 400,
        top: 20,
        left: 650,
        opacity: 20,
        z: 2,
        id: 5,
        con:'给你物美价廉的服务，新鲜的水果，只需简单的操作，即刻获得香味诱人的水果'
    }
];
box.addEventListener('mouseover', function() {
    animate(arraw, {
        opacity: 100
    });
});
box.addEventListener('mouseout', function() {
    animate(arraw, {
        opacity: 0
    });
});

var next = document.querySelector('.next');
var prev = document.querySelector('.prev');
var timer = null;
var flag = true;
next.addEventListener('click', function() {

    clearInterval(timer);
    if (flag == true) {
        move(true);
        flag = false;
    }
});
next.addEventListener('mouseleave', function() {

    clearInterval(timer);
    run();

});
prev.addEventListener('click', function() {
    clearInterval(timer);
    if (flag == true) {
        move(false);
        flag = false;
    }
});
prev.addEventListener('mouseleave', function() {
    run();
});

function run() {
    clearInterval(timer);
    timer = setInterval(function() {

        if (flag == true) {
            flag = false;
            move(true);
        }
    }, 1500);
}

function move(x) {
    if (x != undefined) {
        if (x) {
            json.push(json.shift());
        } else {
            json.unshift(json.pop());
        };
    };

    for (var i = 0; i < json.length; i++) {
        // console.log(lis[i]);
        animate(lis[i], {

            width: json[i].width,
            top: json[i].top,
            left: json[i].left,
            opacity: json[i].opacity,
            zIndex: json[i].z
        }, function() {
            flag = true;
        })
        content.innerText = json[i].con;
    };
}

move();
run();

//获取属性值
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    };
};

function animate(obj, json, callback) {
    // 先停止定时器
    clearInterval(obj.timers);
    obj.timers = setInterval(function() {
        var stoped = true;
        for (var k in json) {
            var leader = 0;
            if (k == 'opacity') {
                leader = Math.round(getStyle(obj, k) * 100) || 100;
            } else {
                leader = parseInt(getStyle(obj, k)) || 0;
            };
            // json[k]是目标位置
            var step = (json[k] - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if (k == 'opacity') {
                obj.style[k] = leader / 100;
                obj.style['filter'] = 'alpha(opacity=' + leader + ')';
            } else if (k == 'zIndex') {
                obj.style['zIndex'] = json[k];
            } else {
                obj.style[k] = leader + "px";
            }
            if (leader != json[k]) {
                stoped = false;
            }
        };
        if (stoped) {
            clearInterval(obj.timers);
            callback && callback();
        };
    }, 50);
};
