/**
 * Created by asus-pc on 2016/8/22 0022.
 */
function supportLabel() {
    var labels=document.getElementsByTagName("label");
    for (var i=0;i<labels.length;i++) {
        var current_label=labels[i];
        var input_id=current_label.getAttribute("id");
        var target_input=document.getElementById(input_id);
        current_label.onclick=function () {
            target_input.onfocus();
        }
    }
}

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

window.onload=function () {
    supportPlaceholder();
};