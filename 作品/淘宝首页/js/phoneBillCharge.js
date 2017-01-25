/**
 * Created by asus-pc on 2017/1/23 0023.
 * Three part:
 * First:hover and show.
 * 1.When hover on the first four btn,add active class to it and show the box.
 *
 * Second:click and fill.
 * 1.When Click on the icon btn,show the box by change display.
 * 2.Register event to options,get its value by data-value,and convey it to fillInput function.
 * 3.In the fillInput func,replace the inner content of input with parameter conveyed.
 * 4.At the same time,the form below should be changed,but I will omit it.
 *
 * Third:click close and reveal box.
 */

    /*First*/
var convenientFunctionBtns=document.querySelectorAll(".convenient-function-btn");
var i;
for (i=0;i<4;i++) {
    var currentCFBtn=convenientFunctionBtns[i];
    var dataTarget=currentCFBtn.getAttribute("data-target");
    (function (dataTarget) {
        currentCFBtn.onmouseover=function () {
            removeClass("active-convenient-function-btn");
            addClass(this,"active-convenient-function-btn");
            showFuncBox(dataTarget);
            removeClass("active-phone-number-history");
        }
    })(dataTarget)
}

function removeClass(targetClass) {
    var targetEle=document.querySelector("."+targetClass);
    if (targetEle) {
        var classPattern=new RegExp(" "+targetClass);
        targetEle.className=targetEle.className.replace(classPattern,"");
    }
}

function addClass(targetEle,targetClass) {
    if (targetEle.className.indexOf(targetClass)==-1) {
        targetEle.className+=" "+targetClass;
    }
}

function showFuncBox(dataTarget) {
    var targetEle=document.querySelector("."+dataTarget);
    removeClass("active-function-box");
    addClass(targetEle,"active-function-box");
    //targetEle.style.display="block";
}

/*Second*/
var numberHistoryBtns=document.querySelectorAll(".number-history-btn");
for (i=0;i<numberHistoryBtns.length;i++) {
    numberHistoryBtns[i].onclick=function () {
        var sameLevelNumberHistory=document.querySelector(".phone-number-history-wrapper");
        if (sameLevelNumberHistory.className.indexOf("active-phone-number-history")==-1) {
            addClass(sameLevelNumberHistory,"active-phone-number-history");
        } else {
            removeClass("active-phone-number-history");
        }
    }
}

var faceValueOptions=document.querySelectorAll("");

var phoneNumberHistories=document.querySelectorAll(".phone-number-history");
for (i=0;i<phoneNumberHistories.length;i++) {
    phoneNumberHistories[i].onclick=function () {
        fillInput(this.lastChild.nodeValue);
        removeClass("active-phone-number-history");
    }
}

function fillInput(targetContent) {
    var phoneNumberInput=document.querySelector("#phone-number");
    phoneNumberInput.value=targetContent;
}

/*Third*/
var convenientCloseBtns=document.querySelectorAll(".convenient-box-close");

for (i=0;i<convenientCloseBtns.length;i++) {
    convenientCloseBtns[i].onclick=function () {
        removeClass("active-convenient-function-btn");
        removeClass("active-function-box");
        removeClass("active-phone-number-history");
    }
}