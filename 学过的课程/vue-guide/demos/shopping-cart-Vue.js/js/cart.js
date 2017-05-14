/**
 * Created by asus-pc on 2017/5/12 0012.
 */
var app=new Vue({
    el:'#app',
    data: {
        totalMoney:0,
        productList:[],
        checkAllFlag:false
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
                this.productList.forEach((val,index)=> {
                    Vue.set(val,'checked',true);
                });
            } else {
                //if UN-check all:
                this.productList.forEach((val,index)=> {
                    Vue.set(val,'checked',false);
                });
            }

            //this.productList.forEach((val,index)=> {
            //    val.checked=val.checked?false:true;
            //    this.checkItem(val);
            //});
        }
    }
});

Vue.filter('globalFormatMoney',function (val,type) {
    return '￥ '+val+' '+type
});