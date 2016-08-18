/*
 * Created by asus-pc on 2016/8/17 0017.
 */
function addOnloadEvent(func) {
    var oldonload=window.onload;
    if (typeof oldonload !='function') {
        window.onload=func;
    }   else    {
        window.onload=function () {
            oldonload();
            func();
        }
    }
}

function insertAfter(newEle,targetEle) {
    var parent=targetEle.parentNode;
    if (parent.lastChild==targetEle) {
        parent.appendChild(newEle);
    }   else   {
        parent.insertBefore(newEle,targetEle.nextSibling);
    }
}

function addClass(ele,class_name) {
    if (!ele.className) {
        ele.className=class_name;
    } else {
        var newClassName=ele.className;
        newClassName+=" ";
        newClassName+=class_name;
        ele.className=newClassName;
    }
}

function highlightLocation() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers=document.getElementsByTagName("header");
    if (headers.length==0) return false;
    var nav=headers[0].getElementsByTagName("nav");
    if (nav.length==0) return false;

    var links=nav[0].getElementsByTagName("a");
    var link_url;
    var current_url=window.location.href;
    for (var i=0;i<links.length;i++) {
        var current_link_text=links[i].lastChild.nodeValue.toLowerCase();
        link_url=links[i].getAttribute("href");
        if (current_url.indexOf(link_url)!=-1) {
            links[i].className="here";
            document.body.setAttribute("id",current_link_text);
        }
    }
}

addOnloadEvent(highlightLocation());

function moveHeaderBackground(current_link_text) {
    var final_x;
    var headers=document.getElementsByTagName("header");
    if (headers[0].movement) {
        clearTimeout(headers[0].movement);
        /* 掉了一个[0]，填上后完美！*/
    }
    switch (current_link_text) {
        case "home":
            final_x=100;
            break;
        case "about":
            final_x=170;
            break;
        case "photos":
            final_x=240;
            break;
        case "live":
            final_x=310;
            break;
        case "contact":
            final_x=380;
            break;
    }
    //初始化
    if (!headers[0].style.backgroundPositionX) {
        headers[0].style.backgroundPositionX="100%";
    }
    //取得当前位置的数值
    var x_pos=parseInt(headers[0].style.backgroundPositionX);
    var distance=0;
    if(x_pos==final_x) {
         return true;
    }
    if (x_pos<final_x) {
        distance=Math.ceil((final_x-x_pos)/10);
        x_pos+=distance;
    }
    if (x_pos>final_x) {
        distance=Math.ceil((x_pos-final_x)/10);
        x_pos-=distance;
    }
    //改变原值
    headers[0].style.backgroundPositionX=x_pos+"%";

    //原来的这种方法我实在理解不了，故放弃了。
    //var repeat="moveHeaderBackground('"current_link_text"')";
    //headers[0].movement=setTimeout(repeat,100);
    headers[0].movement=setTimeout(function () {moveHeaderBackground(current_link_text)},10);
}

function prepareMoveHeaderBackground() {
    //gradual enhancement omitted...
    var headers=document.getElementsByTagName("header");
    var nav_links=headers[0].getElementsByTagName("a");
    for (var i=0;i<nav_links.length;i++) {
        nav_links[i].onmouseover=function() {
            var current_link_text=this.lastChild.nodeValue.toLowerCase();
            //alert("current_link_text:"+current_link_text);
            moveHeaderBackground(current_link_text);
        }
    }
}

addOnloadEvent(prepareMoveHeaderBackground());
