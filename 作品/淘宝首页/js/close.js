/**
 * Created by asus-pc on 2016/11/28 0028.
 */
var close_buttons=document.getElementsByClassName("close");
var i;
for (i=0;i<close_buttons.length;i++) {
    var target_Id=close_buttons[i].getAttribute("data-target");
    //close_buttons[i].onclick=close_Itself(target_Id);
    /*The above declaration has a bug,It will take effect immediately,but not after click.*/
    close_buttons[i].onclick=function () {
        close_Itself(target_Id);
    }
}
function  close_Itself (target_Id) {
    var target=document.getElementById(target_Id);
    target.style="display:none;"
}