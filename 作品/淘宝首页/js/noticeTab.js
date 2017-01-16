/**
 * Created by asus-pc on 2017/1/16 0016.
 * 1.get each tab.
 * 2.bind mouseover event to tab.
 * 3.write mouseover event:
 *      a.hide past active content.
 *      b.show target content by add active class.
 */
var noticeTabs=document.querySelectorAll(".notice-tab");
var noticeContents=document.querySelectorAll(".notice-content");

for (var i=0;i<noticeTabs.length;i++) {
    var currentTab=noticeTabs[i];
    (function (i) {
        currentTab.onmouseover=function () {
            operateTab(i);
            operateContent(i);
        }
    })(i)
}

function operateContent(i) {
    var pastActiveContent=document.querySelector(".active-notice-content");
    pastActiveContent.className=pastActiveContent.className.replace(/ active-notice-content/,"");
    var targetNoticeContent=noticeContents[i];
    targetNoticeContent.className+=" active-notice-content";
}

function operateTab(i) {
    var pastActiveTab=document.querySelector(".active-notice-tab");
    pastActiveTab.className=pastActiveTab.className.replace(/ active-notice-tab/,"");
    var targetNoticeTab=noticeTabs[i];
    targetNoticeTab.className+=" active-notice-tab";
}
