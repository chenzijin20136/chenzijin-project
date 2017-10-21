var timer = null;
var iNowLi = 0;
$(function() {
    initSize(); //初始化大小
    initMove(); //初始化运动事件
});

function initSize() {
    initBodySize(); //初始化body高度
    initFooterSize(); //初始化footer大小
    initHeaderSize();
}
window.onresize = function() {
    initSize();
    //initHeaderSize();
}


function initMove() {
    initFooterMove();
    initContentMove();
    initHeaderMove();
}

function initBodySize() {
    $('body').height($(window).height());
}

function initFooterSize() {
    // var iSingWidth = parseInt($(".footerUl>li").css("width"));
    $(".footerUl").css("width", 1.8 * ($(".footerUl>li").length + 1) + "rem");
    initFooterLeft();
}

function initFooterLeft() {
    var ileft = 3 - $(".footerUl>.active").prevAll().length * 1.8;
    $(".footerUl").css("left", ileft + "rem");
}

function initFooterMove() {
    for (var i = 0, len = $(".footerUl>li").length; i < len; i++) {
        $(".footerUl>li:eq(" + i + ")").get(0).index = i;
    }
    $(".footerUl>li:eq(0)").addClass("active");
    $(".footerUl>li:eq(0)").find(".inRan").css({
        "width": "0.55rem",
        "height": "0.55rem"
    }).next().animate({
        "top": "-0.22rem",
        "left": "-0.7rem",
        "width": "2rem"
    }, 500);
    $(".footerUl>li").click(function() {
        if ($(this).is(".active")) {
            return;
        } else {
            clearInterval(timer);
            var nowLe = $(".footerUl").get(0).offsetLeft;
            var iLe = $(".footerUl>.active").get(0).offsetLeft - this.offsetLeft;
            startBufferMove($(".footerUl").get(0), {
                "left": nowLe + iLe
            });
            $(".footerUl>li").removeClass()
                .find(".inRan").animate({
                    "width": "0.48rem",
                    "height": "0.48rem",
                }, 300).next().animate({
                    "top": "0.75rem",
                    "left": "-0.8rem",
                    "width": "1rem",
                }, 500);

            $(this).find(".inRan").animate({
                "width": "0.55rem",
                "height": "0.55rem",
            }, 500).next().animate({
                "top": "-0.22rem",
                "left": "-0.7rem",
                "width": "2rem",
            }, 500);
            $(this).addClass("active");


            $(".contentUl>li:eq(" + iNowLi + ")").animate({
                "opacity": 0,
                "left": "-3rem",
                "top": "3rem",
                "display": "none"
            }, 500);
            iNowLi = this.index;
            $(".contentUl>li:eq(" + iNowLi + ")").css({
                "left": "-3rem",
                "top": "-2rem",
                "display": "block"
            });
            // startBufferMove($(".contentUl>li:eq(" + iNowLi + ")").get(0), {
            //     "opacity": 1
            // });
            $(".contentUl>li:eq(" + iNowLi + ")").animate({
                "opacity": 0.8,
                "left": "0",
                "top": "0"
            }, 500);
        }
        timer = setInterval(function() {
            if (iNowLi != $(".footerUl>li").length - 1) {
                $(".footerUl>li:eq(" + (iNowLi + 1) + ")").triggerHandler("click");
            } else {
                $(".footerUl>li:eq(0)").triggerHandler("click");
            }
        }, 3000);
    });
    timer = setInterval(function() {
        if (iNowLi != $(".footerUl>li").length - 1) {
            $(".footerUl>li:eq(" + (iNowLi + 1) + ")").triggerHandler("click");
        } else {
            $(".footerUl>li:eq(0)").triggerHandler("click");
        }
    }, 3000);
}

function initContentMove() {
    $(".contentUl>li:eq(0)").css("opacity", "0.8").css("display", "block");
    $(".contentUl>li").find("img").bind("mouseover", function() {
        clearInterval(timer);
        $(this).animate({
            "width": 150 + "%",
            "top": -25 + "%",
            "left": -25 + "%",
        }, 800).css("opacity", 1);
    }).bind("mouseout", function() {
        $(this).animate({
            "top": 0 + "%",
            "left": 0 + "%",
            "width": 100 + "%",
        }, 800).css("opacity", 1);
        timer = setInterval(function() {
            if (iNowLi != $(".footerUl>li").length - 1) {
                $(".footerUl>li:eq(" + (iNowLi + 1) + ")").triggerHandler("click");
            } else {
                $(".footerUl>li:eq(0)").triggerHandler("click");
            }
        }, 3000);
    });
}

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