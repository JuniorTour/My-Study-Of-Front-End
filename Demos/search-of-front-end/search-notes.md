1. 绝对定位的百分比值：
``` css
   .carousel-wrapper {
            overflow: visible;
            width:25%;
            height:50%;
            outline: 3px solid #000;
            margin: 5% auto;
            position: relative;
        }
        .carousel-item-wrapper {
            width:200%;
            height:80%;
            position: absolute;
            top:10%;
            /*绝对定位的百分比值，仅仅只相对于相对定位元素的宽/高。
            此处的.carousel-item-wrapper会居中与父元素.carousel-wrapper，
            因为item-wrapper距离父元素.carousel-wrapper顶部为10%，相应的底部即为：
            100%-80%-10%=10%也是10%，故居中。*/
            left: 0;
        }
```
2. Chrome的styles面板可以很方便的可视化的添加text-shadow、box-shadow等特效。
只需要点击每一个声明块右下角的三个点图标即可！

3. 属性选择器通过已经存在的属性名或属性值匹配元素。
``` css
  [attr]
  表示带有以 attr 命名的属性的元素。
  [attr=value]
  表示带有以 attr 命名的，且值为"value"的属性的元素。
  [attr~=value]
  表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少一个值为"value"。
  [attr|=value]
  表示带有以 attr 命名的属性的元素，属性值为“value”或是以“value-”为前缀（"-"为连字符，Unicode编码为U+002D）开头。典型的应用场景是用来来匹配语言简写代码（如zh-CN，zh-TW可以用zh作为value）。
  [attr^=value]
  表示带有以 attr 命名的，且值是以"value"开头的属性的元素。
  [attr$=value]
  表示带有以 attr 命名的，且值是以"value"结尾的属性的元素。
  [attr*=value]
  表示带有以 attr 命名的，且值包含有"value"的属性的元素。
  [attr operator value i]
  在带有属性值的属性选型选择器表达式的右括号（]括号）前添加用空格间隔开的字母i（或I）可以忽略属性值的大小写（ASCII字符范围内的字母）
```
4. for in 和 for of
            /*
            * for...in循环将迭代对象的所有可枚举属性和从它的构造函数的 prototype 继承而来的属性，即是说for in会把prototype
            * 上的属性也迭代到。
            * for...in 遍历（当前对象及其原型上的）每一个属性名称,而 for...of遍历（当前对象上的）每一个属性值。
            * 注意，for in只能获取到属性“名名名名名名名”，而非属性本身！
            * 而，for of则能获取到属性“值值值值值值值值”。
            * 但是，for of不能用于对象上，只适用于可迭代对象(包括 Array, Map, Set, String, TypedArray，arguments 对象等等。
            *
            * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of
            * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in
            **/

5. line-height的百分比值相对于自身的font-size值

6. border-radius: 0 0 50% 50%;
等价于：
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
注意，是上左、上右、下左和下右。

7. 对于三个值的margin：
Three values apply first to top, second to left and right and third to bottom.
这三个值分别应用于：上，左和右，下。

8. rem 技术方案：
所有元素的尺寸大小，边距，行高 等于都用了rem 相对宽度来表达
整个页面的宽度是 10rem，那么1rem就等于屏幕宽度十分之一，这样就为不同移动设备页面开发带来了方便的**等比缩放**能力。所有元素的大小设定都使用针对html标签的 font-size 比例来计算。

1rem=html font-size =screen width /10 = 屏幕宽度/10

[使用Flexible实现手淘H5页面的终端适配 - amfe/article](https://github.com/amfe/article/issues/17)

#### 我的理解：
> 例如，为了适配device-pixel-ratio = 2 的 retina **高清**屏幕，令设计稿宽750px。

类似于**栅格系统**，我们把屏幕分为10份，作为等比例缩放的**参照标准**。

对于iphone 6，其**设备独立像素**宽度为375pt * 667pt，而其dpr为2，根据公式，我们可以得知其**物理像素**为750pt * 1334pt。
为了把页面分成10分，我们将html元素的font-size设置为750px/10 = 75px，也即1rem=75px，则整个屏幕宽度为10rem。
此时，使用 1 rem 作为单位就是页面的1/10宽。
设计稿中的元素占页面多大的比例，就用相应的rem进行设置，这样的做法，可以实现**等比缩放**的效果。

再比如，对于iphone 5，其**设备独立像素**宽度为320px，其**物理像素**为750pt * 1334pt。
将html元素的font-size设置为640px/10 = 64px，则整个屏幕宽度为10rem。
此时， 1 rem 就还是页面的1/10宽。

在不同的屏幕上，CSS像素所呈现的物理尺寸是一致的，而不同的是CSS像素所对应的物理像素具数是不一致的。
在普通屏幕下1个CSS像素对应1个物理像素，而在Retina屏幕下，1个CSS像素对应的却是4个物理像素。

但是为了适配其他机型，让其他机型都是1 rem = 页面的1/10宽，就需要**动态设置html的font-size**。
这样虽然屏幕的大小变化了，但是相应的布局的比例仍保持不变，该是1rem即1/10页面宽的元素，还是保持1/10的页面宽度，实现了我们想要的：**不同的设备拥有一致的显示效果**。

9. box-sizing：border-box;
 width 和 height 属性包括内容，内边距和边框，**但不包括外边距**。

10. CSS linear-gradient() 函数创建一个表示颜色线性渐变的 <image> 。而不是CSS  <color> ，所以可以用于background-image。

<angle>属性的添加导致了一些混乱，它应当指向终点方向，但是这些关键字却通常指起始方向。
0deg === to top , 从下到上
45deg === to right top
-45deg === to left top

11. 数组的初始化：
`let arr = []`
好于
`let arr = new Array()`
> [] is shorter to type, and would be quicker to parse (assuming a
reasonable implementation). There's no reason not to use it.

>https://stackoverflow.com/questions/7375120/why-is-arr-faster-than-arr-new-array#
So to simplify it all: with array literals, the VM knows we want an array; with new Array, the VM needs to use extra CPU cycles to figure out what new Array actually does.

12. <bg-size>
参看 background-size. 这个属性的定义必须在 <position> 之后, 并使用 '/' 符号分隔。

13. Activation and Variable Object in JavaScript
https://stackoverflow.com/questions/6337344/activation-and-variable-object-in-javascript
总结：在全局环境中只有变量对象（Variable Object），而在一个函数的执行环境（ execution context ）中活动对象（Activation Object）会被用作变量对象。