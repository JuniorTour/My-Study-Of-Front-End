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
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'

export default {
  name: 'app',
  components: {
    'v-header': header
  }
}
</script>

<style lang="stylus">
  #app
    color: red
    a
      color: #000

  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
