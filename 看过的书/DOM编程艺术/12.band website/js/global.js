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

function moveHeaderBackground(nav_link) {
    var current_link_text=nav_link.lastChild.nodeValue.toLowerCase();
    var final_x=0;
    switch (current_link_text) {
        case "home":
            //final_x=0;
            break;
        case "about":
            final_x=350;
            break;
        case "photo":
            final_x=490;
            break;
        case "live":
            final_x=630;
            break;
        case "contact":
            final_x=750;
            break;
    }
    var headers=document.getElementsByTagName("header");
    headers[0].style.backgroundPosition=final_x+"px center";
}

function prepareMoveHeaderBackground() {
    //gradual enhancement...
    var headers=document.getElementsByTagName("header");
    var nav_links=headers[0].getElementsByTagName("a");
    for (var i=0;i<nav_links.length;i++) {
        nav_links[i].onmouseover=function() {
            moveHeaderBackground(this);
        }
    }
}

addOnloadEvent(prepareMoveHeaderBackground());
