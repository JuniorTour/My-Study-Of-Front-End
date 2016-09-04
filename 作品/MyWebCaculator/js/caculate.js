/**
 * Created by asus-pc on 2016/9/4 0004.
 */

/*思路：

 1.模块化各部分
 2.大致有计算部分，键盘响应部分，鼠标点击响应部分，显示部分
 3.键盘、鼠标产生输入时，由各自的函数处理为统一的格式，交给计算部分计算，
 最后由显示部分显示在input之中。

 * */
function addOnloadEvent(func) {
    var oldOnload=window.onload;
    if (typeof oldOnload=="function") {
        window.onload=function() {
            oldOnload();
            func();
        }
    } else {
        window.onload=func;
    }
}

function addClass(newClass,targetId) {
    if (!document.getElementById(targetId)) return false;
    var target=document.getElementById(targetId);
    var current_class=target.className;
    if (current_class=="") {
        current_class=newClass;
    } else {
        current_class+=" ";
        current_class+=newClass;
    }
    target.className=current_class;
}

function mouseResponse() {}

function keyboardResponse() {}

function caculate() {}