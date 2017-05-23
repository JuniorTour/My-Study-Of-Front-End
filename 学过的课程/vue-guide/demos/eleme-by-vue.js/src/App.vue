<template>
  <div>
    <!--<div class="header">-->
    <!--Header-->
    <!--</div>-->
    <v-header></v-header>
    <div class="tab border-1px">
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
    !!!!
  </div>
</template>

<script>
  import header from 'components/header/header.vue'

  export default {
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";

  .tab {
    display: flex;
    width:100%;
    height:40px;
    line-height:40px;
    /*border-bottom: 1px solid #000;*/
    /*boder-1px(rgba(7,17,27,0.1))*/
  }
  .border-1px {
    position: relative;
  }
  .border-1px:after {
    width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgba(7,17,27,0.1);
    content: ' ';
  }
  @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
    .border-1px:after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .border-1px:after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  .tab-item {
    flex: 1;
    text-align: center;
  }
  .tab-item a {
    display: block;
    color: rgb(77,85,93);
  }
  .tab-item a.active {
    color: rgb(240,20,20);
  }
</style>
