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

function mouseListen() {
    var calculator_keyboard=document.getElementById("calculator-keyboard");
    var each_key=calculator_keyboard.getElementsByTagName("td");

    for (var i=0;i<each_key.length;i++) {
        var current_key=each_key[i];
        //var current_value=current_key.getAttribute("data-value");
        current_key.onclick=function () {
            calculate(this.getAttribute("data-value"));
        }
        //current_key.onclick=calculate(this.getAttribute("data-value"));
    }
}

addOnloadEvent(mouseListen);

function keyboardResponse() {}

var calculate_process="";
var para1=undefined,para2=undefined;    /*global variable*/

var num=10;
switch (true) {
    case (num<0):
        alert("<0");
        break;
    case (num=10):
        alert("10");
        break;
}

function calculate(input_value) {
    //if(!pressed_btn) return false;
    //var input_value=pressed_btn.getAttribute("data-value");

    if (!input_value||input_value=="") return false;

    var outcome;
    var flag_of_operator=-1; /*used for mark the operator*/
    var int_input=parseInt(input_value);
    //alert(int_input);
    /*除了几个数字键，其余均会被转化为Not a Number.*/

    /*下面这一块，用于检测应该对哪一个参数进行操作。*/
    var flag_operate_target=1; /*一个flag，默认值1表示要操作的数是p1*/
    var operate_intermediary;
    if(para1==undefined&&para2==undefined) {
        operate_intermediary=0;
    } else if(para2==undefined&&flag_of_operator!=-1) {
        operate_intermediary=0;
        flag_operate_target=2; /*值2表示要操作的数是p2*/
    } else if (para2!=undefined) {
        operate_intermediary=para2;
        flag_operate_target=2;
    }

    switch (input_value) {
        //case (parseInt(input_value)>=0&&parseInt(input_value)<=9):
            /*此处的一个问题：case的value似乎必须和input_value相关。上面这句就不行，运行时会被
            * 直接跳过。*/
        //case ("8"):
            /*而上面这一句是可以运行的。*/
        //case (int_input<=9):
            /*也不行，跳过了。*/
        case (input_value<="9"):
            operate_intermediary=operate_intermediary*10+int_input;
            calculate_process+=operate_intermediary;
            break;
        case ("+/-") :
            operate_intermediary=-operate_intermediary;
            break;
        case ("%") :
            operate_intermediary/=100;
            break;
        case (".") :
                                                                                            /*暂时搁置对浮点数的处理。*/
            break;
        case ("+") :
            flag_of_operator=1;
            break;
        case ("-") :
            flag_of_operator=2;
            break;
        case ("*") :
            flag_of_operator=3;
            break;
        case ("/") :
            flag_of_operator=4;
            break;
        case ("clear") :
                                                                                                        //clear();
            break;
        case ("=") :
            switch (flag_of_operator) {
                case 1:
                    outcome=para1+para2;
                    break;
                case 2:
                    outcome=para1-para2;
                    break;
                case 3:
                    outcome=para1*para2;
                    break;
                case 4:
                    if(para1==0||para2==0) {
                        outcome=0;
                    } else {
                        outcome=para1/para2;
                    }
                    break;
            }
            displayOutcome(outcome);
            break;
    }

    /*做完操作之后，把得出的值赋还给参数。*/
    if (flag_operate_target==1) {
        para1=operate_intermediary;
    } else if (flag_operate_target==2) {
        para2=operate_intermediary;
    }

    displayProcess(calculate_process);

    return true;    /*indicate to run success.*/
}

function displayOutcome(outcome) {
    if(!outcome) return false;

    var cal_window=document.getElementById("cal-window");
    cal_window.innerHTML=outcome.toString();
    return true;
}

function displayProcess(calculate_process) {
    if(!calculate_process) return false;

    var cal_window=document.getElementById("cal-window");
    cal_window.innerHTML=calculate_process;
    return true;
}