/**
 * Created by asus-pc on 2016/8/20 0020.
 */
function stripedTable() {
    var tables=document.getElementsByTagName("table");
    var my_switch=1;
    var trs=tables[0].getElementsByTagName("tr");
    for (var i=1;i<trs.length;i++) {
        if (my_switch==1) {
            trs[i].style.backgroundColor="#eb6";
            my_switch=-my_switch;
        } else {
            trs[i].style.backgroundColor="#ec8";
            my_switch=-my_switch;
        }
    }
}

window.onload=stripedTable;