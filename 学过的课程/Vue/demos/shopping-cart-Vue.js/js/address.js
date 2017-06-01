/*
 * Created by asus-pc on 2017/5/14 0014.
 */
new Vue ({
    el:'.address',
    data: {
        addressList:[],
        listLength:3,
        selectedIndex:0,
        selectedShippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.renderAddressList();
        })
    },
    methods: {
        renderAddressList:function () {
            this.$http.get('data/address.json').then(res=> {
                var data=res.data;
                if (data.status===0) {
                    this.addressList=data.result;
                }
            })
        },
        loadMoreAddress: function () {
            this.listLength=this.addressList.length;
        },
        setDefault:function (addressId) {
            this.addressList.forEach((item,index)=> {
                //if (item.addressId===addressId) {
                //    item.isDefault=true;
                //} else {
                //    item.isDefault=false;
                //}

                /*can be simplified to*/
                item.isDefault = (item.addressId === addressId );
            })
        }
    },
    computed: {
        filteredAddressList: function () {
            return this.addressList.slice(0,this.listLength);
        }
    }
});