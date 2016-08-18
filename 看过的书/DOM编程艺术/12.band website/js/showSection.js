/**
 * Created by asus-pc on 2016/8/18 0018.
 */

function showSection(sec_id) {
    //alert(sec_id);
    if (!document.getElementById(sec_id)) return false;
    var sec=document.getElementsByTagName("section");
    for(var i=0;i<sec.length;i++) {
        //alert(sec[i].getAttribute("id"));
        if (sec[i].getAttribute("id")==sec_id) {
            sec[i].style.display="block";
        } else {
            sec[i].style.display="none";
        }
    }
}

function prepareTab() {
    var articles=document.getElementsByTagName("article");
    var nav_tab=articles[0].getElementsByTagName("nav");
    var tab_links=nav_tab[0].getElementsByTagName("a");

    for (var i=0;i<tab_links.length;i++) {
        var current_link=tab_links[i];
        current_link.onclick=function() {
            showSection(this.getAttribute("href").split("#")[1]);
            //给已经active的li去除active类
            var has_active=document.getElementsByClassName("active");
            has_active[0].removeAttribute("class");
            //给被点击的li加上active类
            this.parentNode.setAttribute("class","active");
            return false;
        }
    }
}

window.onload=prepareTab;