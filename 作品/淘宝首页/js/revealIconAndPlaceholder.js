/**
 * Created by asus-pc on 2016/12/13 0013.
 */

var searchInput=document.querySelectorAll("#search-input")[0];
searchInput.oninput= function () {
    revealIconAndPlaceholder();
};

function revealIconAndPlaceholder() {
    var searchForm=document.querySelectorAll("#search-form")[0];
    var searchIcon=searchForm.querySelectorAll(".tb-icon")[0];
    var searchPlaceholder=searchForm.querySelectorAll(".search-placeholder")[0];

    searchIcon.style.display="none";
    searchPlaceholder.style.display="none";
}