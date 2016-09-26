/**
 * Created by asus-pc on 2016/9/4 0004.
 */

/*思路：

 1.模块化各部分
 2.大致有计算部分，键盘响应部分，鼠标点击响应部分，显示部分
 3.键盘、鼠标产生输入时，由各自的函数处理为统一的格式，交给计算部分计算，
 最后由显示部分显示在input之中。


    The End~~2016年9月26日20:47:46
    Learned a lot from it!
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
        current_key.onclick=function () {
            calculate(this.getAttribute("data-value"));
        };
        /*使用下面这种写法，页面加载后会产生所有按键都点了一遍的效果。*/
        //current_key.onclick=calculate(current_key.getAttribute("data-value"));
    }
                                        /*这两个循环不知道为什么会互相覆盖。*/
    for (i=0;i<all_trs.length-1;i++) {
        var current_tr=all_trs[i];
        var operate_btn=current_tr.lastElementChild;
        operate_btn.onclick=function() {
            removeBorderedBtn();
            addClass("active-border",this);
            calculate(this.getAttribute("data-value"));
        }
    }
}

addOnloadEvent(mouseListen);

document.onkeydown=keyboardResponse;

function keyboardResponse(e) {
    /*在Firefox之中，要用所谓“隐藏的事件”e来获取按键事件。*/
    var evt=e || window.event;
    var key_code=evt.which||evt.keyCode||evt.charCode;
    //alert(key_code);
    /*a vital problem about keyboard response is how to realize the hover,active and border effect!!!!!*/
    switch (key_code) {
        case 8:
            calculate("clear");
            break;
        case 13:
            calculate("=");
            break;
        case 96:
            calculate("0");
            break;
        case 97:
            calculate("1");
            break;
        case 98:
            calculate("2");
            break;
        case 99:
            calculate("3");
            break;
        case 100:
            calculate("4");
            break;
        case 101:
            calculate("5");
            break;
        case 102:
            calculate("6");
            break;
        case 103:
            calculate("7");
            break;
        case 104:
            calculate("8");
            break;
        case 105:
            calculate("9");
            break;
        case 106:
            calculate("*");
            break;
        case 107:
            calculate("+");
            break;
        case 109:
            calculate("-");
            break;
        case 110:
            calculate(".");
            break;
        case 111:
            calculate("/");
            break;
        case 189:
            calculate("+/-");
            break;
        case 173:
            calculate("+/-");
            break;
    }
    if (evt.shiftKey&&key_code==53) {
        calculate("%");
    }
}

/*变量的作用域很重要*/
var cal_window=document.getElementById("cal-window");
var para1=undefined,para2=undefined;    /*global variable*/
var flag_operator=-1; /*used for mark the operator*/
var calculate_process="";
var outcome;
var flag_display=-1;  /*a flag indicates to whether the outcome is displayed.*/
//var  flag_into_Circulation=-1;  /*a flag indicate to recur,deserted.*/
var flag_float_input=-1;    /*a flag indicates to judge float input. */

function calculate(input_value) {
    if (!input_value||input_value=="") {
        alert("Please input something.");
        return false;
    }

    var input_type="";
    var manage_process_pattern=/^\d{1,9}\.\d{1,9}[×÷\+\-]|^\d{1,9}[×÷\+\-]/g;
    /*2016年9月26日13:21:02，此生的第一个正则*/

    var int_input=parseInt(input_value);
    /*除了几个数字键，其余均会被转化为Not a Number.*/

    switch (true) {
        /*When variable is true,everything is ok,even if the statement is not associated with variable.
        * But it is not comprehensive to human.*/
        case (input_value=="+"||input_value=="-"||input_value=="*"||input_value=="/") :
            input_type="operator";
            /*after input an operator,switch flag_float_input to off(-1)*/
            if (flag_float_input==1) {
                flag_float_input=-1;
            }
            break;
        case (input_value=="%"||input_value=="."||input_value=="clear"||input_value=="="||input_value=="+/-") :
            input_type="special";
            break;
        case (int_input>=0&&int_input<=9) :
            /*use int_input to test the input_value,if i_v is number,then change its value to "number",
             ,indicate to number type input:*/
            input_type="number";
            /*after once calculation,when input is number, restore all the variables:*/
            if (flag_display!=-1) {
                calculate_process="";
                flag_display=-1;
                para1=undefined;
                para2=undefined;
            }
            break;
    }

    /*when two parameters and a operator is input,if get the another operator input,treat it as "=" and the input operator*/
    if (para1!=undefined&&para2!=0&&flag_operator!=-1
        &&input_type=="operator") {
        /*two things to do:1."=" 2.the operator itself.*/
        if (input_type!="number") {
            calculate("=");
        }
    }

    /*function that use the past outcome as the next parameter.*/
    if (flag_display==1&&input_type=="operator") {
        para1=Math.round(outcome*100000000)/100000000;
        para2=undefined;
        calculate_process="";
        calculate_process+=para1;
        flag_display=-1;
    }

    /*when operator was changed during the calculate,help to update window simultaneously with this flag.*/
    var flag_has_operator=-1;
    if (flag_operator!=-1) {
        flag_has_operator=1;
    }

    /*下面这一块，用于检测应该对哪一个参数进行操作。*/
    var flag_operate_target=1; /*一个flag，默认值1表示要操作的数是p1*/
    var operate_intermediary;
    if(para1==undefined&&para2==undefined) {
        operate_intermediary=0;
    } else if(para1!=undefined&&flag_operator==-1) {
        operate_intermediary=para1;
    } else if(para2==undefined&&flag_operator!=-1) {
        operate_intermediary=0;
        flag_operate_target=2;
    } else if (para2!=undefined) {
        operate_intermediary=para2;
        flag_operate_target=2;
    }

    /*limit the input length:*/
    if(operate_intermediary.toString().length>=9&&input_type=="number") return false;

    switch (input_type) {
        case "number":
            if (flag_float_input==1) {
                //alert(operate_intermediary.toString().indexOf("."));
                var decimal_length=1;
                if (operate_intermediary.toString().indexOf(".")!=-1) {     /*UGLY!!!*/
                    decimal_length=operate_intermediary.toString().length-operate_intermediary.toString().indexOf(".");
                } else if (calculate_process.toString().indexOf(".")!=-1) {
                    decimal_length=calculate_process.match(/\.\d{0,9}/g).toString().length;
                }
                operate_intermediary=(operate_intermediary*Math.pow(10,decimal_length)+int_input).toFixed(10);
                operate_intermediary=operate_intermediary/Math.pow(10,decimal_length);
                calculate_process+=int_input;
            } else if (flag_float_input==-1) {
                operate_intermediary=operate_intermediary*10+int_input;
                calculate_process+=int_input;
            }
            break;
        case "special":
            switch (input_value) {
                case (".") :
                    /*暂时搁置对浮点数的处理,9.7.
                     * At last,handle with float type.*/
                    flag_float_input=1;
                    /*after had gotten a outcome,reset "."input to "0."*/
                    if (flag_display==1) {
                        operate_intermediary=0;
                        para2=undefined;
                        flag_display=-1;
                    }
                    if (operate_intermediary==0&&flag_operator==-1) {
                        calculate_process=operate_intermediary+".";
                    } else if (operate_intermediary==0&&flag_operator!=-1) {
                        if (calculate_process.lastIndexOf("0")!=-1) {
                            calculate_process+=".";
                        } else {
                            calculate_process+=operate_intermediary+".";
                        }
                    } else {
                        calculate_process+=".";
                    }
                    break;
                case ("+/-") :
                    operate_intermediary=-operate_intermediary;
                    //calculate_process=operate_intermediary;
                    calculate_process=calculate_process.toString().match(manage_process_pattern)+operate_intermediary;
                    break;
                case ("%") :
                    operate_intermediary/=100;
                    //calculate_process=operate_intermediary;
                    calculate_process=calculate_process.toString().match(manage_process_pattern)+operate_intermediary;
                    break;
                case ("clear") :
                    flag_float_input=-1;
                    flag_display=2;  /*value 2 indicate to clear()*/
                    //clear();
                    break;
                case ("=") :
                    if (para1==undefined||para2==undefined) {
                        break;
                    }
                    removeBorderedBtn();
                    flag_display=1;
                    switch (flag_operator) {
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
                    flag_operator=-1;    /*还原符号标志。*/
                    break;
            }
            break;
        case "operator":
            switch (input_value) {
                case ("+") :
                    flag_operator=1;
                    /*this part can be functioned!*/
                    if (flag_has_operator==-1) {
                        calculate_process+="+";
                    } else {
                        calculate_process=para1+"+";
                    }
                    break;
                case ("-") :
                    flag_operator=2;
                    if (flag_has_operator==-1) {
                        calculate_process+="-";
                    } else {
                        calculate_process=para1+"-";
                    }
                    break;
                case ("*") :
                    flag_operator=3;
                    if (flag_has_operator==-1) {
                        calculate_process+="×";
                    } else {
                        calculate_process=para1+"×";
                    }
                    break;
                case ("/") :
                    flag_operator=4;
                    if (flag_has_operator==-1) {
                        calculate_process+="÷";
                    } else {
                        calculate_process=para1+"÷";
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
    if (flag_display==1) {
        displayOutcome(Math.round(outcome*100000000)/100000000);
    } else if(flag_display==-1) {
        displayProcess(calculate_process);
    } else if (flag_display==2) {
        clear();
        flag_display=-1;
    }

    return true;    /*indicate to run success.*/
}

function displayOutcome(outcome) {
    if(outcome=="") {
        alert("outcome invalid!");
        return false;
    }
    cal_window.style.fontSize=getFontSize(outcome.toString().length)/27+"em";
    cal_window.innerHTML=outcome.toString();
    return true;
}

function displayProcess(calculate_process) {
    if(!calculate_process) {
        /*!var will be true,if the var=0.Pay attention to it. */
        alert("calculate_process invalid!");
        return false;
    }
    cal_window.style.fontSize=getFontSize(calculate_process.length)/27+"em";
    cal_window.innerHTML=calculate_process;
    return true;
}

function getFontSize(input_length) {
    /*This function used to get the proper font size of window.*/
    /*Change it to em so that it can accompany with mobile.!!!
    * 120/25=4.8*/
    var final_size=120;
    if (input_length>6&&input_length<=8) {
        final_size=120-15*(input_length-6);
    } else if (input_length==9) {
        final_size=80;
    } else if (input_length==10) {
        final_size=70;
    } else if (input_length>=11&&input_length<=17) {
        final_size=70-5*(input_length-10);
    } else if (input_length>17) {
        final_size=35;
    }
    return final_size;
}

function clear() {
    removeBorderedBtn();
    cal_window.innerHTML="0";
    cal_window.style.fontSize="4.8em";
    para1=undefined;
    para2=undefined;
    calculate_process="";
    flag_operator=-1;
}

function removeBorderedBtn() {
    var bordered_btn=document.getElementsByClassName("active-border");
    if (bordered_btn.length<=0) return false;
    //delete bordered_btn[0].className;
                                                                            /*delete directly has no effect??*/
    for (var i=0;i<bordered_btn.length;i++) {
        bordered_btn[i].className="";
    }
}