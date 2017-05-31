title: 手把手和你用原生JS写循环播放图片轮播
tags:
  - JavaScript
id: 331
categories:
  - JavaScript-demo
date: 2017-01-18 20:18:00
---
最近在学做淘宝首页的静态页面，正好也学了一段时间的JavaScript，也试着用原生JS做了其中的一些交互功能。

做起来最收获的就是这个**循环**播放的图片轮播组件，其制作思路和对JS特性的利用，都让我受益匪浅，本文就将相关经验分享给大家。

先看看在线的DEMO：[原生JS循环播放图片轮播组件](http://http://juniortour.net/master-pieces/js/standard-js-carousel/standard-js-carousel.html) （我的得意之作，(～￣▽￣)～，支持IE8+）

<!--more-->

### 一、思路讲解:

##### 先说基本的非循环无过渡图片轮播：

这个思路还是很简单的，通过观察一些图片轮播就可以发现，图片轮播一般是以一个尺寸较小的父元素作为窗口，包裹住一组较长的长条状的内容子元素，利用` overflow: hidden; `，只显示出父元素大小的长条的一部分，并通过改变父元素的定位或translate3d属性，实现改变显示图片。

基本原理可以参考demo：[图片轮播基本原理演示]()

##### 比较有意思的其实是**循环**的功能：

但是这样简单的轮播是不会循环播放的，也就是说当一轮图片项目（item）播放到结尾；或者当在第一张图（第一个项目）继续向前时，就会超出内容子元素，出现空白部分，这一般不是我们想要的结果。

有多种思路可以实现循环播放，我采用的是淘宝网首页所用的：

**复制开头和结尾的项目，分别放在开头和结尾，当播放到开头或结尾的项目，需要循环时，临时取消transition属性，并立即用定位跳转至相应真正的的开头或结尾之后，再恢复原来的transition，继续正常滚动播放，从而利用视觉上的“欺骗”，实现带有过渡效果的循环播放。**



### 二、HTML标记部分

核心理念是简洁、语义化。这部分因为我学过bootstrap所以借鉴了[bootstrap的HTML标记结构](http://v3.bootcss.com/javascript/#carousel)。

其结构为：

外层的.carousel-wrapper包裹着轮播的三个主要部分，分别是：

`.carousel-item-wrapper`：项目内容部分（本文中的例子使用了a标签代替图片，大家可以自行尝试替换为图片；同时添加了文字序号标记，以便于大家观察理解，**尤其要注意两个复制的开头和结尾copy-1和copy-5）**。

`.carousel-control-wrapper`：控制部分，即两个用于向左右移动的按钮。

`.carousel-index-wrapper`：索引部分，即图片轮播中的那一排“小圆点”。为了便于用JS操控，我添加了id作为“钩子”。在这里bootstrap用的是自定义的data属性。

``` html
<div class="carousel-wrapper">
    <div class="carousel-item-wrapper" style="left: -520px;">
        <div class="carousel-item">
            <a href="#">
                <!--As an demo,I use pure background color as example instead of img.-->
                <!--<img src="img/carousel-img-5" alt="">-->
            </a>
            <div class="carousel-index-mark">
                copy-5
            </div>
        </div>
        <div class="carousel-item">
            <a href="#">
                <!--<img src="img/carousel-img-1" alt="">-->
            </a>
            <div class="carousel-index-mark">
                1
            </div>
        </div>
        <div class="carousel-item">
            <a href="#">
                <!--<img src="img/carousel-img-2" alt="">-->
            </a>
            <div class="carousel-index-mark">
                2
            </div>
        </div>
        <div class="carousel-item">
            <a href="#">
                <!--<img src="img/carousel-img-3" alt="">-->
            </a>
            <div class="carousel-index-mark">
                3
            </div>
        </div>
        <div class="carousel-item">
            <a href="#">
                <!--<img src="img/carousel-img-4" alt="">-->
            </a>
            <div class="carousel-index-mark">
                4
            </div>
        </div>
        <div class="carousel-item">
            <a href="#">
                <!--<img src="img/carousel-img-5" alt="">-->
            </a>
            <div class="carousel-index-mark">
                5
            </div>
        </div>
        <div class="carousel-item">
            <a href="#">
                <!--<img src="img/carousel-img-1" alt="">-->
            </a>
            <div class="carousel-index-mark">
                copy-1
            </div>
        </div>
    </div>
    <div class="carousel-control-wrapper">
        <button id="prev">
            <!--prev-->
            <i>&lt;</i>
        </button>
        <button id="next">
            <!--next-->
            <i>&gt;</i>
        </button>
    </div>
    <div class="carousel-index-wrapper">
        <ul>
            <li class="carousel-index-btn active-carousel-index-btn" id="carousel-to-1">carousel-index-1</li>
            <li class="carousel-index-btn" id="carousel-to-2">carousel-index-2</li>
            <li class="carousel-index-btn" id="carousel-to-3">carousel-index-3</li>
            <li class="carousel-index-btn" id="carousel-to-4">carousel-index-4</li>
            <li class="carousel-index-btn" id="carousel-to-5">carousel-index-5</li>
        </ul>
    </div>
</div>
```

### 三、CSS样式部分
总的来说比较简单，关键部分我加上了注释，有不明白的地方，欢迎和我交流。

``` css
        /*reset*/
        * {
            border: none;
            padding: 0;
            margin: 0;
        }
        button {
            outline: none;
        }
        li {
            list-style: none;
        }

        .carousel-wrapper {
            width:520px;
            height:280px;
            overflow: hidden;   /*关键*/
            position: relative;
            margin: 100px auto;
        }
        .carousel-item-wrapper {
            width:3640px;
            height:280px;
            position: absolute;
            top: 0;
            left: -520px;
            /*transition: left .2s ease-in;*/
            /*默认不使用CSS声明的过渡属性，避免一次滑动多页的bug。*/
        }
        .carousel-item a {
            display: block;
            background-color: red;
            width:520px;
            height: 280px;
        }

        /*使用不同背景色的a替代图片。*/
        .carousel-item:nth-child(1) a {
            background-color: rgb(129,194,214);
            /*第五张图片的复制*/
        }
        .carousel-item:nth-child(2) a {
            background-color: rgb(129,146,214);
        }
        .carousel-item:nth-child(3) a {
            background-color: rgb(217,179,230);
        }
        .carousel-item:nth-child(4) a {
            background-color: rgb(220,247,161);
        }
        .carousel-item:nth-child(5) a {
            background-color: rgb(131,252,216);
        }
        .carousel-item:nth-child(6) a {
            background-color: rgb(129,194,214);
        }
        .carousel-item:nth-child(7) a {
            background-color: rgb(129,146,214);
            /*第一张图片的复制*/
        }

        .carousel-item {
            float: left;
        }
        .carousel-index-mark {
            font-size:60px;
            color: black;
            position: absolute;
            top: 0;
        }
        .carousel-control-wrapper {
            transition: all .2s;
        }
        .carousel-wrapper:hover button {
            display: block;
        }
        .carousel-control-wrapper button {
            transition: all .2s linear;
            display: none;
            width:24px;
            height:36px;
            line-height:36px;
            background-color: rgba(0,0,0,.3);
            color: #fff;
            position: absolute;
            top: 50%;
            cursor: pointer;
        }
        button#prev {
            left:0;
        }
        button#next {
            right:0;
        }
        button i {
            font-size: 18px;
        }
        .carousel-index-wrapper {
            width:65px;
            height:13px;
            overflow: hidden;
            position: absolute;
            bottom:15px;
            left:50%;
            margin-left: -33px;
        }
        .carousel-index-btn {
            width:9px;
            height:9px;
            float: left;
            margin:2px;
            background-color: #b7b7b7;
            border-radius: 50%;
            text-indent: -999em;
            /*这个-999em的文字对齐声明有助于增强可访问性。*/
            cursor: pointer;
        }
        .active-carousel-index-btn {
            background-color: #f44103;
        }
```

### 四、JS部分
这一部分稍微有些复杂，因此我们逐步来实现各部分功能。
0.功能和结构分析：
根据最开始的思路讲解，我们把这个轮播的JavaScript功能大致分为以下几个部分：
点击按钮左右滑动功能、点击索引原点跳转功能和循环播放功能。

1.实现点击左右滑动功能：
``` javascript
    function addLoadEvent(func) {
        var oldLoad = window.onload;
        if (typeof oldLoad != 'function') {
            window.onload = func;
        } else {
            window.onload = function () {
                oldLoad();
                func();
            }
        }
    }
    //给文档加载完成后的load事件绑定相应的处理函数：
    addLoadEvent(preventDefaultAnchors);
    addLoadEvent(carouselControl);

    /*用一个对象把轮播组件的相关参数封装起来，优点是灵活便于扩展升级；缺点是同时也增加了文件的体积。*/
    var carouselInfo = {
        itemWidth: 520,
        trueItemNum: 5,
        itemNum: 7,
        totalWidth: 7 * 520
    };

    //阻止a标签默认的点击跳转行为
    function preventDefaultAnchors() {
        var allAnchors = document.querySelectorAll('a');

        for (var i = 0; i < allAnchors.length; i++) {
            allAnchors[i].addEventListener('click', function (e) {
                e.preventDefault();
            }, false);
        }
    }

    function carouselControl () {
        var prev = document.querySelector("#prev");
        var next = document.querySelector("#next");
        var carouselWrapper = document.querySelector(".carousel-wrapper");

        prev.onclick = function () {
            slide(-1);
        };
        next.onclick = function () {
            slide(1);
        };
    }

    function slide(slideItemNum) {
        var itemWrapper=document.querySelector(".carousel-item-wrapper");
        var currentLeftOffset=(itemWrapper.style.left)?parseInt(itemWrapper.style.left): 0,
            targetLeftOffset=currentLeftOffset-(slideItemNum*carouselInfo.itemWidth);


        itemWrapper.style.left=targetLeftOffset+'px';
    }
```

最终代码：
``` JavaScript
dsa 
```
### 五、代码示例

1.GitHub地址：



2.在线demo：
[原生JS循环播放图片轮播组件](http://http://juniortour.net/master-pieces/js/standard-js-carousel/standard-js-carousel.html) 

3.完整代码：
``` html
<div>
```