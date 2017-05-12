/**
 * Created by asus-pc on 2017/5/12 0012.
 */
var app=new Vue({
    el:'#app',
    data: {
        totalMoney:0,
        productList:[]
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
            let _this=this;
            /*resource插件绑定在vue实例上，需要这样使用：*/
            this.$http.get('data/cartData.json',{id:123}).then(res=>{
                this.totalMoney=res.body.result.totalMoney;
                this.productList=res.body.result.list;
            });
        }
    },
});

Vue.filter('globalFormatMoney',function (val,type) {
    return '￥ '+val+' '+type
})