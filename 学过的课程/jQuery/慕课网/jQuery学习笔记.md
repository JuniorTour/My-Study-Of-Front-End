### 1. 回调函数内的this：
```
$('p').click(function(){
    //把p元素转化成jQuery对象
    var $this= $(this)
    $this.css('color','red')
})
```

### 2. 奇怪的remove() ：
```
    $('#toRemove').click(function () {
        $('body').remove('#remove-target')
    })

    /*.remove() 无参数时，移除的是调用的jq对象。
    * 有参数时，http://jquery.cuishifeng.cn/remove.html中说移除的是匹配到的元素，
    * 但我测试后发现并不会？？？
    * 并且在stackoverfolw和GitHub上搜索到的一些代码也都是不传递参数给.remove()的，
    * 直接用来移除引用的jq对象。
    * http://api.jquery.com/remove/，也说支持传入参数，我在jsbin上测试反倒是也可以传入参数。*/
```