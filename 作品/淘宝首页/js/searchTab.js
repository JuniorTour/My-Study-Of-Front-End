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
    currentTab.onclick=function () {
        /*way 1:ok!*/
        switchTab(this);

        /*way 2:no!*/
        //switchTab(this);
        /*BUG3:Mutable variable is accessible from closure.
         * And with this invoke,the currentTarget will always be the last value,"shop".*/

        /*way 3:not all ok.*/
        //return switchTab(this.getAttribute("data-target"));
        /*Unresolved function or method getAttribute().*/
    };
}

function switchTab(tabClicked) {
    var target=tabClicked.getAttribute("data-target");

    /*A problem puzzled me is that which part should be a part of changeSomeStyle function?
    * and which part should be in this switchTab function individually?*/
    switch (target) {
        case "treasure":
            changeSomeStyle(tabClicked,"//s.taobao.com/search","#f50","block","block");
            break;
        case "tmall":
            changeSomeStyle(tabClicked,"//list.tmall.com/search_product.htm","#c40000","none","none");
            break;
        case "shop":
            changeSomeStyle(tabClicked,"//shopSearch.taobao.com/browse/shop_search.htm","#f50","none","none");
            break;
    }
}

function changeSomeStyle(tabClicked,actionAddress,targetBackgroundColor,imageSearchDisplay,placeholderDisplay) {
    var searchField=document.querySelectorAll(".search-field")[0];
    var searchForm=searchField.querySelectorAll("form")[0];
    var searchInput=document.querySelectorAll("#search-input")[0];
    var imgSearch=document.querySelectorAll(".image-search")[0];
    var searchBtn=document.querySelectorAll(".search-button button")[0];
    var searchPlaceholder=document.querySelectorAll(".search-placeholder")[0];

    removeActiveClass();
    tabClicked.className+=" active-tab";
    searchInput.focus();
    searchForm.setAttribute("action",actionAddress);

    searchField.style.backgroundColor=targetBackgroundColor;
    searchBtn.style.backgroundColor=targetBackgroundColor;

    imgSearch.style="display:"+imageSearchDisplay+";";

    searchPlaceholder.style="display:"+placeholderDisplay+";";
}

function removeActiveClass() {
    var removeClassTarget=document.querySelectorAll(".active-tab")[0];
    var removeClasses=removeClassTarget.className.split(/\s+/);
    /*Find the position of .active-tab,record it by var i. */
    for (i=0;i<removeClasses.length;i++) {
        if (removeClasses[i]=="active-tab") {
            break;
        }
    }
    /*Delete target class*/
    removeClasses.splice(i,1);
    /*Rebuild the class*/
    removeClassTarget.className=removeClasses.join(" ");
}