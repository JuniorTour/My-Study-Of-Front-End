/*
Created by asus-pc on 2016/12/12 0012.

workflow:
    1.Register onclick event to each tab.

    2.Get the data-target information from tab .

    3.Display:none some irrelevant part,such as placeholder label,picture-search button.

    4.Set the relevant class to target div and tab,so that it can set style.
 */
var searchTabs=document.querySelectorAll(".search-tab");
/*Refer to <Professional js for web dev>,it said that the querySelectorAll() is better than getElementsByClassName() in
* performance.*/
var i;
for (i=0;i<searchTabs.length;i++) {
    var currentTab=searchTabs[i];
    var currentTarget=currentTab.getAttribute("data-target");
    currentTab.onclick=function (currentTarget) {
        //switchTab(this);
        return switchTab(currentTarget);
        /*BUG3:Mutable variable is accessible from closure.
        * And with this invoke,the currentTarget will always be the last value,"shop".*/
    };
}

function switchTab(target) {
    //var currentTarget=target.getAttribute("data-target");
    var searchField=document.getElementsByClassName("search-field")[0];
    var searchForm=searchField.getElementsByTagName("form")[0];
    var imgSearch=document.querySelectorAll(".image-search")[0];
    var searchBtn=document.querySelectorAll(".search-button button")[0];

    switch (target) {
        case "treasure":
            break;
        case "tmall":
            searchForm.setAttribute("action","//list.tmall.com/search_product.htm");
            searchField.currentStyle.backgroundColor("#c40000");
            searchBtn.className="tmall-search";
            imgSearch.style="display:none;";
            var searchPlaceholderTmall=document.querySelectorAll(".search-placeholder-tmall");
            searchPlaceholderTmall.style="display:block;";
            break;
        case "shop":
            break;
    }
}