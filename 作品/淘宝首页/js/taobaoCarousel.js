/**
 * Created by asus-pc on 2016/12/22 0022.
 */
window.onload=function () {
    var prev = document.querySelectorAll("#prev")[0];
    var next = document.querySelectorAll("#next")[0];
    var indexBtns = document.querySelectorAll(".carousel-index-btn");
    var carouselWrapper=document.querySelectorAll(".carousel-wrapper")[0];

    prev.onclick = function () {
        moveSlide(520,false);
    };
    next.onclick = function () {
        moveSlide(-520,false);
    };

    for (var i = 0; i < indexBtns.length; i++) {
        (function (i) {
            var currentIndexBtn = indexBtns[i];
            currentIndexBtn.onclick = function () {
//                    console.log("i="+i);
                moveSlide( (i+1) *-520,true);
            }
        })(i);
    }

    var timerScroll;

    function play() {
        timerScroll=setInterval(function () {
//                next.onclick();
            moveSlide(-520,false);
        },2000 );
    }
    play();

    function stop() {
        clearInterval(timerScroll);
    }

    carouselWrapper.onmouseover=function () {
        stop();
    };
    carouselWrapper.onmouseout=function () {
        play();
    };
};

function moveSlide(offsetValue,isIndex) {
    var itemWrapper=document.querySelectorAll(".carousel-item-wrapper")[0];
    var indexBtns = document.querySelectorAll(".carousel-index-btn");
    var newLeftOffset;
    var currentLeftOffset=window.getComputedStyle(itemWrapper).getPropertyValue("left");

    if (isIndex==true) {
        //if press index btn,then calculate its offset
        newLeftOffset=offsetValue;
    } else {
        //if press next/prev btn or auto move ,then calculate its offset
        newLeftOffset=parseInt(currentLeftOffset)+offsetValue;
    }

    itemWrapper.style.left=newLeftOffset+"px";

    switch (newLeftOffset) {
        case 0:
            indexBtnClassSwitch(indexBtns[4]);
            setTimeout(function () {
                startCirculatoryPlay(itemWrapper,-2600);
            },200);
            break;
        case -520:
            indexBtnClassSwitch(indexBtns[0]);
            break;
        case -1040:
            indexBtnClassSwitch(indexBtns[1]);
            break;
        case -1560:
            indexBtnClassSwitch(indexBtns[2]);
            break;
        case -2080:
            indexBtnClassSwitch(indexBtns[3]);
            break;
        case -2600:
            indexBtnClassSwitch(indexBtns[4]);
            break;
        case -3120:
            indexBtnClassSwitch(indexBtns[0]);
            setTimeout(function () {
                startCirculatoryPlay(itemWrapper,-520);
            },200);
            break;
    }
}

function indexBtnClassSwitch(activeTarget) {
    //delete the past active-index class
    var activeBtn=document.querySelectorAll(".active-carousel-index-btn")[0];
    activeBtn.className=activeBtn.className.replace(" active-carousel-index-btn","");

    activeTarget.className+=" active-carousel-index-btn";
}

function startCirculatoryPlay (itemWrapper,targetOffset) {
    itemWrapper.style.transition="none";
    itemWrapper.style.left=targetOffset+"px";
    setTimeout(function () {
        itemWrapper.style.transition="left .2s ease-in";
    },20);
}