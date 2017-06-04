<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab-group">
      <div class="tab">
        <router-link to="/home">首页</router-link>
        <router-link to="/message">消息</router-link>
        <router-link to="/discovery">发现</router-link>
        <router-link to="/me">我</router-link>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import header from './components/header/header.vue'

export default {
  name: 'app',
  data(){
    return {
      transitionName: 'slide_back'
    }
  },
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus">
  /* 跳转页面动画 */
  .slide-enter-active, .slide_back-enter-active {
    transition: all 3s linear;
  }

  .slide-enter, .slide_back-enter {
    /*position: absolute;*/
    width: 100%;
  }

  .slide-leave, .slide_back-leave {
    /*position: absolute;*/
    width: 100%;
  }

  .slide-leave-active {
    /*position: absolute;*/
    /*transition: all 3s linear;*/
    transform: translate(-100%);
  }
  .slide_back-leave-active {
    /*position: absolute;*/
    /*transition: all 3s linear;*/
    transform: translate(100%);
  }

  .slide-enter {
    transform: translateX(100%);
  }
  .slide_back-enter {
    transform: translateX(-100%);
  }

  #app
    color: red
    a
      color: #000
</style>
