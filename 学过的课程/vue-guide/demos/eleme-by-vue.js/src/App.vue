<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--故意对上边框::before没有做1px hack，以对比效果。-->
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <router-view>????</router-view>
  </div>
</template>

<script>
  import header from 'components/header/header.vue'

  const ERR_OK = 0

  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('api/seller').then(res => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
          console.log(this.seller)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";

  .tab
    display: flex;
    width:100%;
    height:40px;
    line-height:40px;
    /*border-bottom: 1px solid #000;*/
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1;
      text-align: center;
      & > a
        display: block;
        color: rgb(77, 85, 93);
        &.active
          color: rgb(240, 20, 20)
</style>
