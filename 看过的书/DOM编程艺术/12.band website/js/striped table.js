/**
 * Created by asus-pc on 2016/8/20 0020.
 */
function stripedTable() {
    var tables=document.getElementsByTagName("table");
    var my_switch=1;
    var trs=tables[0].getElementsByTagName("tr");
    for (var i=1;i<trs.length;i++) {
        if (my_switch==1) {
            //trs[i].style.backgroundColor="#eb6";
            /*不用style属性，因为会覆盖自定义的hover*/
            trs[i].setAttribute("class","odd");
            my_switch=-my_switch;
        } else {
            //trs[i].style.backgroundColor="#ec8";
            trs[i].setAttribute("class","even");
            my_switch=-my_switch;
        }
    }
}

window.onload=stripedTable;