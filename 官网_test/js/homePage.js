$(function() {
    init(); //初始化页面
});

window.onresize = function() {
    initSize();
};

//初始化页面
function init() {
    initSize(); //初始化大小
    initMove(); //初始化运动及事件
}

//初始化页面大小
function initSize() {
    initOutlineSize();
    initLoadSize(); //初始化load页面大小
    initHeaderSize(); //初始化header
}

//初始化运动及事件
function initMove() {
    initHeaderMove();
    initLoadMove(); //初始化load运动及事件
    initOutlineMove();
}

//初始化load页面大小
function initLoadSize() {
    $("#load").css({
        "lineHeight": $(window).height() - $("#header").height() + "px",
        "height": ($(window).height() - $("#header").height()) + "px",
    });
}
//初始化load运动及事件
function initLoadMove() {
    var sArr = ['we are friends', 'we are relatives', 'we are one', 'and we is you'];
    var timer = null;
    var i = 0;
    var j = 0;
    var zt = 0;
    clearInterval(timer);
    timer = setInterval(function() {
        if (zt == 0) {
            if (i != sArr.length) {
                if (j != sArr[i].length) {
                    $("#load").html(
                        $("#load").html() + sArr[i][j++]
                    );
                    if (j == sArr[i].length) {
                        zt = 3;
                    }
                } else {
                    i++;
                    j = 0;
                    $("#load").html("");
                }
            } else {
                i = 0;
                j = 0;
                $("#load").html("");
            }
        } else {
            zt--;
        }
    }, 150);

}
//初始化header
function initHeaderSize() {
    if ($("body").width() < 680) {
        $(".headerUl").slideUp(0);
    } else {
        $(".headerUl").slideDown(0);

    }

}

function initHeaderMove() {
    $(".menu").click(function() {
        $(".headerUl").slideToggle(500);
    });
}
//初始化outline
function initOutlineSize() {
    $("#outline>div").css({
        "height": ($(window).height() - $("#header").height()) + "px",
    });
}

function initOutlineMove() {
    var iNow = 0;
    $(window).on("mousewheel", function(event) {
        event.preventDefault();
        if (event.originalEvent.wheelDelta < 0) {
            if (iNow != $("#outline>div").length - 1) {
                $("#outline>div:eq(" + iNow++ + ")").slideUp();
            }
        } else {
            if (iNow != 0) {
                $("#outline>div:eq(" + --iNow + ")").slideDown();
            }
        }
    });
}