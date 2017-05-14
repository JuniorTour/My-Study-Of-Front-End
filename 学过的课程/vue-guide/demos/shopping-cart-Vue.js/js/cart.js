/**
 * Created by asus-pc on 2017/5/12 0012.
 */
var app=new Vue({
    el:'#app',
    data: {
        productList:[],
        checkAllFlag:false,
        delModalShow:false,
        targetDeleteItem:{}
    },
    filters: {
        formatMoney: function (val) {
            /*Pay attention to the precision lose of js!!
             * Especially  when it related to money!!!
             * It should be processed by back-end.*/
            return '￥ '+val;
        }
    },
    mounted:function () {
        this.$nextTick(function () {
            //ensure the this.$el has embed the document.
            this.cartView();
            //after use $nextTick(),the following is right too.
            //app.cartView();
        })
    },
    methods:{
        cartView:function () {
            //let _this=this;
            /*resource插件绑定在vue实例上，需要这样使用：*/
            this.$http.get('data/cartData.json',{id:123}).then(res=>{
                this.totalMoney=res.body.result.totalMoney;
                this.productList=res.body.result.list;
            });
        },
        changeAmount: function (target,amount) {
            switch (amount) {
                case -1:
                    target.productQuantity-=1;
                    if (target.productQuantity<0) target.productQuantity=0;
                    break;
                case 1:
                    target.productQuantity+=1;
                    break;
            }
        },
        checkItem: function (item) {
            //console.log('this.checked : '+this.checked);
            if (typeof item.checked == 'undefined') {
                Vue.set(item,'checked',true);
                //this.$set(item,'checked',true);
            } else {
                /*注意要用item.checked而非this.checked。
                * 此处的this指向的是这个vue实例，app。*/
                item.checked=!item.checked;
            }
            //如果所有的item都已选中或取消，则相应的更新checkAllFlag。
            var checkAll=false;
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
            for (var oneItem of this.productList) {
                if (oneItem.checked===false || oneItem.checked===undefined) {
                    checkAll=false;
                    break;
                } else {
                    checkAll=true;
                }
            }
            checkAll?this.checkAllFlag=true:this.checkAllFlag=false;
        },
        checkAll:function () {
            this.checkAllFlag=!this.checkAllFlag;
            if (this.checkAllFlag) {
                //if check all:
                this.productList.forEach((val)=> {
                    Vue.set(val,'checked',true);
                });
            } else {
                //if UN-check all:
                this.productList.forEach((val)=> {
                    Vue.set(val,'checked',false);
                });
            }
        },
        saveTargetItem: function (item) {
           this.targetDeleteItem=item;
        },
        deleteItem: function () {
            var index=this.productList.indexOf(this.targetDeleteItem);
            this.productList.splice(index,1);
            /*此处，在真实的业务环境下，应该与后台进行交互后，再从返回的json之中操作。*/
            this.closeDelModal();
        },
        showDelModal:function (item) {
            this.delModalShow=true;
            this.saveTargetItem(item);
        },
        closeDelModal:function () {
            this.delModalShow=false;
        }
    },
    computed: {
        totalMoney: function () {
            let total=0;
            this.productList.forEach((val,index)=> {
                if (val.checked===true) {
                    total+=val.productPrice*val.productQuantity;
                }
            });
            return total;
        }
    }
});

Vue.filter('globalFormatMoney',function (val,type) {
    return '￥ '+val+' '+type
});