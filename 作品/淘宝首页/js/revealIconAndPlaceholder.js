/**
 * Created by asus-pc on 2016/12/13 0013.
 */

var searchInput=document.querySelectorAll("#search-input")[0];
searchInput.oninput= function () {
    //alert(this.value.length);
    changeStatus("none");
    if (searchInput.value.length==0) {
        changeStatus("block");
    }
};

function changeStatus(displayValue) {
    var searchForm=document.querySelectorAll("#search-form")[0];
    var searchIcon=searchForm.querySelectorAll(".tb-icon")[0];
    var searchPlaceholder=searchForm.querySelectorAll(".search-placeholder")[0];

    searchIcon.style.display=displayValue;
    searchPlaceholder.style.display=displayValue;
}