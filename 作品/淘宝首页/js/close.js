/**
 * Created by asus-pc on 2016/11/28 0028.
 */
var close_buttons=document.getElementsByClassName("close");
var i;
for (i=0;i<close_buttons.length;i++) {
    //var target_Id=close_buttons[i].getAttribute("data-target");
    //close_buttons[i].onclick=closeItself(target_Id);
    /*The above declaration has a bug,It will take effect immediately,but not after click.*/
    close_buttons[i].onclick=function () {
        //closeItself(target_Id);
        closeItself(this);
    };
}
function  closeItself (close_button) {
    var target_id=close_button.getAttribute("data-target");
    var target=document.querySelector("#"+target_id);
    target.style.display="none";
}