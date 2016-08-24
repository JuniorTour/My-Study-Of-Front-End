/**
 * Created by asus-pc on 2016/8/22 0022.
 */
function supportLabel() {
    var labels=document.getElementsByTagName("label");
    for (var i=0;i<labels.length;i++) {
        var current_label=labels[i];
        var input_id=current_label.getAttribute("for");
        var target_input=document.getElementById(input_id);
        current_label.onclick=function () {
            target_input.onfocus();
        }
    }
}
/*不能带有()！！！！！！*/
addOnloadEvent(supportLabel);

function supportPlaceholder() {
    //if (Modernizr.input.placeholder) return ;
    var forms=document.getElementsByTagName("form");
    var form_ele=forms[0].elements;
    for (var i=0;i<form_ele.length;i++) {
        var current_ele=form_ele[i];
        if (current_ele.type=="submit") continue;
        var check_placeholder=current_ele.placeholder||current_ele.getAttribute("placeholder");
        //如果没有placeholder属性，就跳出本次循环，处理下一个元素
        if(!check_placeholder) continue;
        current_ele.onfocus=function() {
            var text=this.placeholder||this.getAttribute("placeholder");
            if (text==this.value) {
                this.value="";
                this.className="";
            }
        };
        current_ele.onblur=function() {
            var text=this.placeholder||this.getAttribute("placeholder");
            if (this.value=="") {
                this.value=text;
                this.className="placeholder";
            }
        };
        current_ele.onblur();
    }
}
addOnloadEvent(supportPlaceholder);

function isFilled(form_ele) {
    //把空格去除，检查内容是否为空，
    if(form_ele.value.replace(" ","").length==0) return false;
    var placeholder=form_ele.getAttribute("placeholder")||this.placeholder;
    //检查内容是否为placeholder的值，
    return (form_ele.value!=placeholder);
}

function isEmail(form_ele) {
    //检查是否同时有@和 . 符号，
    return (form_ele.value.indexOf("@")!=-1&&form_ele.valueOf(".")!=-1);
}

function validateForm(a_form) {
    //var forms=document.getElementsByTagName("form");
    for(var i=0;i<a_form.elements.length;i++) {
        var ele=a_form.elements[i];
        if(ele.getAttribute("required")=="required") {
          if (!isFilled(ele)) {
              alert("Please fill in the "+ele.id+" field");
              ele.onfocus();
              return false;
          }
            //alert(ele.type);
            if(ele.type=="email") {
                if (!isEmail(ele)) {
                    alert("The "+ele.type+" field requires '@' and '.' mark");
                    return false;
                 }
            }
        }
    }
}

function prepareForms() {
    var forms=document.getElementsByTagName("form");
    for (var i=0;i<forms.length;i++) {
        var current_form=forms[i];
        current_form.onsubmit=function() {
            return validateForm(this);
        }
    }
}

addOnloadEvent(prepareForms);