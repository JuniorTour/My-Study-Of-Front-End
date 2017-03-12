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
function removeOneClass(targetClass) {
    var targetEle=document.querySelector("."+targetClass);
    if (targetEle) {
        var classPattern=new RegExp(" "+targetClass);
        targetEle.className=targetEle.className.replace(classPattern,"");
    }
}

function removeAllClass(targetClass) {
    var targetEles=document.querySelectorAll("."+targetClass);
    if (targetEles) {
        var classPattern=new RegExp(" "+targetClass);
        for (var i=0;i<targetEles.length;i++) {
            targetEles[i].className=targetEles[i].className.replace(classPattern,"");
        }
    }
}

function addClass(targetEle,targetClass) {
    if (targetEle.className.indexOf(targetClass)==-1) {
        targetEle.className+=" "+targetClass;
    }
}

function showFuncBox(dataTarget) {
    var targetEle=document.querySelector("."+dataTarget);
    removeOneClass("active-function-box");
    addClass(targetEle,"active-function-box");
    //targetEle.style.display="block";
    /*reset value*/
    fillInput("#phone-number","");
    fillInput("#phone-face-value","30元");
    changeCalculatedPrice("30");
}

    /*First*/
var convenientFunctionBtns=document.querySelectorAll(".convenient-function-btn");
var i;
for (i=0;i<4;i++) {
    var currentCFBtn=convenientFunctionBtns[i];
    var dataTarget=currentCFBtn.getAttribute("data-target");
    (function (dataTarget) {
        currentCFBtn.onmouseover=function () {
            removeOneClass("active-convenient-function-btn");
            addClass(this,"active-convenient-function-btn");
            showFuncBox(dataTarget);
            removeOneClass("active-display-block");
        }
    })(dataTarget)
}


/*Second*/
var numberHistoryBtns=document.querySelectorAll(".number-history-btn");
for (i=0;i<numberHistoryBtns.length;i++) {
    numberHistoryBtns[i].onclick=function () {
        var sameLevelNumberHistory=document.querySelector(".phone-number-history-wrapper");
        if (sameLevelNumberHistory.className.indexOf("active-display-block")==-1) {
            addClass(sameLevelNumberHistory,"active-display-block");
        } else {
            removeOneClass("active-display-block");
        }
    }
}

var phoneNumberHistories=document.querySelectorAll(".phone-number-history");
for (i=0;i<phoneNumberHistories.length;i++) {
    phoneNumberHistories[i].onclick=function () {
        fillInput("#phone-number",this.getAttribute("data-value"));
        removeOneClass("active-display-block");
    }
}

var faceValueBtns=document.querySelectorAll(".face-value-btn");
for (i=0;i<faceValueBtns.length;i++) {
    faceValueBtns[i].onclick=function () {
        var sameLevelNumberHistory=document.querySelector(".phone-face-value-wrapper");
        if (sameLevelNumberHistory.className.indexOf("active-display-block")==-1) {
            addClass(sameLevelNumberHistory,"active-display-block");
        } else {
            removeOneClass("active-display-block");
        }
    }
}

var faceValueOptions=document.querySelectorAll(".phone-face-value-option");
for (i=0;i<faceValueOptions.length;i++) {
    faceValueOptions[i].onclick=function () {
        fillInput("#phone-face-value",(this.getAttribute("data-value"))+"元");
        changeCalculatedPrice(this.getAttribute("data-value"));
        removeOneClass("active-display-block");
    }
}

function fillInput(targetInputId,targetContent) {
    var phoneNumberInput=document.querySelector(targetInputId);
    phoneNumberInput.value=targetContent;
}

function changeCalculatedPrice(dataValuePrice) {
    var calculatedPrice;
    switch (dataValuePrice) {
        case "30":
            calculatedPrice="29.4-30";
            break;
        case "50":
            calculatedPrice="49-48";
            break;
        case "100":
            calculatedPrice="98-99.5";
            break;
        case "150":
            calculatedPrice="147-149";
            break;
    }
    var calculatedPriceContent=document.querySelector(".phone-calculated-price");
    calculatedPriceContent.innerHTML=calculatedPrice;
}

/*Third*/
var convenientCloseBtns=document.querySelectorAll(".convenient-box-close");

for (i=0;i<convenientCloseBtns.length;i++) {
    convenientCloseBtns[i].onclick=function () {
        removeOneClass("active-convenient-function-btn");
        removeOneClass("active-function-box");
        removeAllClass("active-display-block");
    }
}