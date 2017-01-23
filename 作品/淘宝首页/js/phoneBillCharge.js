/**
 * Created by asus-pc on 2017/1/23 0023.
 * Two part:
 * First:hover and show.
 * 1.When hover on the first four btn,add active class to it and show the box.
 *
 * Second:click and fill.
 * 1.When Click on the icon btn,show the box by change display.
 * 2.Register event to options,get its value by data-value,and convey it to fillInput function.
 * 3.In the fillInput func,replace the inner content of input with parameter conveyed.
 * 4.At the same time,the form below should be changed,but I will omit it.
 */

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
        }
    })(dataTarget)
}

function removeClass(targetClass) {
    var pastActiveEle=document.querySelector("."+targetClass);
    var classPattern=new RegExp(" "+targetClass);
    pastActiveEle.className=pastActiveEle.className.replace(classPattern,"");
}

function addClass(targetEle,targetClass) {
    targetEle.className+=" "+targetClass;
}

function showFuncBox(dataTarget) {
    var targetEle=document.querySelector("."+dataTarget);
    targetEle.style.display="block";
}