/*
 * Created by asus-pc on 2016/8/20 0020.
 */
function insertAfter(newEle,targetEle) {
    var parent=targetEle.parentNode;
    if (parent.lastChild==targetEle) {
        parent.appendChild(newEle);
    } else {
        parent.insertBefore(newEle,targetEle.nextSibling);
    }
}

function preparePlaceholder() {
    var gallery=document.getElementById("gallery");
    var wrapper=document.createElement("div");
    wrapper.setAttribute("class","wrapper");
    var placeholder=document.createElement("img");
    placeholder.setAttribute("src","img/photos/bassist.jpg");
    placeholder.setAttribute("id","placeholder");
    var description=document.createElement("p");
    var des_text=document.createTextNode("choose a picuture");
    description.appendChild(des_text);
    description.setAttribute("id","description");

    wrapper.appendChild(description);
    wrapper.appendChild(placeholder);
    insertAfter(wrapper,gallery);
}

function showPic(current_link) {
    var placeholder=document.getElementById("placeholder");
    var src=current_link.getAttribute("href");
    placeholder.setAttribute("src",src);

    var current_img=current_link.getElementsByTagName("img");
    var des_text="";
    //alert(current_img[0].getAttribute("alt"));
    /*在这里的if之中如果没有[0]，会导致直接跳转入链接到的图片。很奇怪？？
    * 用F12的断点调试看了看，其运行过程十分复杂，跳转了许多文件，未解决....
    * 这个判断的错误为什么会影响后续的所有脚本（甚至是prepareGallery中独立的return false;）呢？*/
    if (current_img[0].getAttribute("alt")) {
        des_text=current_img[0].getAttribute("alt");
    } else {
        des_text="";
    }
    var description=document.getElementById("description");
    if (description.firstChild.nodeType==3) {
        description.firstChild.nodeValue=des_text;
    }
    return false;
}

function prepareGallery() {
    var gallery=document.getElementById("gallery");
    var gallery_links=gallery.getElementsByTagName("a");
    for (var i=0;i<gallery_links.length;i++) {
        gallery_links[i].onclick=function () {
            showPic(this);
            return false;
        }
    }
}

window.onload=function () {
    preparePlaceholder();
    prepareGallery()
};
