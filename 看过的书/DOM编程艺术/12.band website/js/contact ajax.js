/**
 * Created by asus-pc on 2016/8/25 0025.
 */
function displayLoading(target) {
    while (target.hasChildNodes()) {
        target.removeChild(target.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","../img/ample.jpg");
    content.setAttribute("alt","loading...");
    target.appendChild(content);
}

function submitByAjax(form,target) {
    //创建ajax对象
    var request=new XMLHttpRequest();
    if(!request) return false;
    //加载过程之中显示载入图像，不知道为什么看不到。
    displayLoading(target);
    //创建数组，以特定格式储存表单内容
    var data_parts=[];
    var ele;
    for (var i=0;i<form.elements.length;i++) {
        ele=form.elements[i];
        data_parts[i]=ele.id+"="+encodeURIComponent(ele.value);
    }
    var data=data_parts.join("&");
    request.open("POST",form.getAttribute("action"),true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.onreadystatechange=function() {
        if (request.readyState==4) {
            if(request.status==200||request.status==0) {
                var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if(matches.length>0) {
                    target.innerHTML=matches[1];
                } else {
                    target.innerHTML="<p>Oops,there was an error.</p>"
                }
            } else {
                target.innerHTML='<p>'+request.status+"</p>";
            }
        };
        request.send(data);
        return true;
    }
}