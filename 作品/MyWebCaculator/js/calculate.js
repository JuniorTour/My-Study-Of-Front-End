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

function addClass(newClass,target) {
    //if (!document.getElementById(targetId)) return false;
    //var target=document.getElementById(targetId);
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
    var all_trs=calculator_keyboard.getElementsByTagName("tr");
    var each_key=calculator_keyboard.getElementsByTagName("td");
    var i;

    for (i=0;i<each_key.length;i++) {
        var current_key=each_key[i];
        var current_value=current_key.getAttribute("data-value");
        current_key.onclick=function () {
            calculate(this.getAttribute("data-value"));
        };
        /*使用下面这种写法，页面加载后会产生所有按键都点了一遍的效果。*/
        //current_key.onclick=calculate(current_key.getAttribute("data-value"));
    }

    for (i=0;i<all_trs.length-1;i++) {
        var current_tr=all_trs[i];
        var operate_btn=current_tr.lastElementChild;
        operate_btn.onclick=function() {
            addClass("active-border",this);
            calculate(this.getAttribute("data-value"));
        }
    }
}

addOnloadEvent(mouseListen);

//function keyboardResponse() {}

/*变量的作用域很重要*/
var outcome;
var para1=undefined,para2=undefined;    /*global variable*/
var flag_of_operator=-1; /*used for mark the operator*/
var calculate_process="";
var flag_of_display=-1;  /*a flag indicates to whether the outcome is displayed.*/

{                                                                                                                       /*BUG*/
    var num=10;
    switch (true) {
        case (num<0):
            alert("<0");
            break;
        case (num=10):
            alert("10");
            break;
    }
}
//var test=NaN;
//alert(test.toString()=="NaN");

function calculate(input_value) {
    if (!input_value||input_value=="") return false;

    var int_input=parseInt(input_value);
    /*除了几个数字键，其余均会被转化为Not a Number.*/
    if (int_input>=0&&int_input<=9) {
        /*use int_input to test the input_value,if i_v is number,then change its value to "number",
        * indicate to number type input.*/
        input_value="number";

        if (flag_of_display!=-1) {
            calculate_process="";
            flag_of_display=-1;
            para1=undefined;
            para2=undefined;
        }
    }
    if (flag_of_display==1&&int_input.toString()=="NaN") {
        para1=outcome;
        para2=undefined;
    }


    /*下面这一块，用于检测应该对哪一个参数进行操作。*/
    var flag_operate_target=1; /*一个flag，默认值1表示要操作的数是p1*/
    var operate_intermediary;
    if(para1==undefined&&para2==undefined) {
        operate_intermediary=0;
    } else if(para1!=undefined&&flag_of_operator==-1) {
        operate_intermediary=para1;
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
                                                                                                                        /*关于case value的问题，js高程（P60）也没说清。*/
        case "number":
            operate_intermediary=operate_intermediary*10+int_input;
            calculate_process+=int_input;
            break;
        case ("+/-") :
            operate_intermediary=-operate_intermediary;
            calculate_process+=operate_intermediary;
            break;
        case ("%") :
            operate_intermediary/=100;
            calculate_process+=operate_intermediary;
            break;
        case (".") :
                                                                                            /*暂时搁置对浮点数的处理。*/
            break;
        case ("+") :
            flag_of_operator=1;
            calculate_process+="+";
            break;
        case ("-") :
            flag_of_operator=2;
            calculate_process+="-";
            break;
        case ("*") :
            flag_of_operator=3;
            calculate_process+="×";
            break;
        case ("/") :
            flag_of_operator=4;
            calculate_process+="÷";
            break;
        case ("clear") :
            flag_of_display=2;  /*value 2 indicate to clear()*/
            break;
        case ("=") :
            removeBorderedBtn();
            flag_of_display=1;
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
            break;
    }

    /*做完操作之后，把得出的值赋还给参数。*/
    if (flag_operate_target==1) {
        para1=operate_intermediary;
    } else if (flag_operate_target==2) {
        para2=operate_intermediary;
    }

    /*a part that used to decide display what*/
    if (flag_of_display==1) {
        displayOutcome(Math.round(outcome*100000000)/100000000);
    } else if(flag_of_display==-1) {
        displayProcess(calculate_process);
    } else if (flag_of_display==2) {
        clear();
    }

    return true;    /*indicate to run success.*/
}

function displayOutcome(outcome) {
    if(!outcome) return false;

    var cal_window=document.getElementById("cal-window");
    if(outcome.toString().length>=6&&outcome.toString().length<=12) {
        var font_size_number=120-15*(outcome.toString().length-6);
        cal_window.style.fontSize=font_size_number+"px";
    }
    cal_window.innerHTML=outcome.toString();
    return true;
}

function displayProcess(calculate_process) {
    if(!calculate_process) return false;

    var cal_window=document.getElementById("cal-window");
    if(calculate_process.length>=6&&calculate_process.length<=9) {
        var font_size_number=120-15*(calculate_process.length-6);
        cal_window.style.fontSize=font_size_number+"px";
    }
    cal_window.innerHTML=calculate_process;
    //if (calculate_process.length<=9) {
    //    cal_window.innerHTML=calculate_process;
    //}
    return true;
}

function clear() {
    var cal_window=document.getElementById("cal-window");
    cal_window.innerHTML="0";
    cal_window.style.fontSize="120px";
    para1=undefined;
    para2=undefined;
}

function removeBorderedBtn() {
    var bordered_btn=document.getElementsByClassName("active-border");
    //delete bordered_btn[0].className;
    bordered_btn[0].className="";
}