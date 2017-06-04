// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/stylus/index.styl'

Vue.config.productionTip = true

const routerOrder = ['/home', '/message', '/discovery', '/me']

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  watch: {
    '$router'(to, from) {
      console.log('toDepth : ')
      //扩展官方文档方法：
      // console.log('to.path : ' + to.path)
      // console.log('to.path.length : ' + to.path.length)
      // console.log('from.path : ' + from.path)
      // console.log('from.path.length : ' + from.path.length)

      /*特殊处理'/' 和 ‘’ 路由路径，
       *如果处理到这两个路径，总是把它们当做最浅层的路径，把相应的depth记作0。
       * 从而使得其他的所有路径，即使是同级的 '/detail' ，相应的depth为2，也比这两个路径比较起来更深，以应用上正确的过渡动画。*/
      // const toDepth = ((to.path.length) <= 1) ? 0 : to.path.split('/').length
      // const fromDepth = ((from.path.length) <= 1) ? 0 : from.path.split('/').length

      console.log('toDepth : ' + toDepth)
      console.log('fromDepth : ' + fromDepth)
      const toDepth = routerOrder.indexOf(to.path)
      const fromDepth = routerOrder.indexOf(from.path)

      // 根据路由深度，来判断是该从右侧进入还是该从左侧进入
      // this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide'
      console.log('this.transitionName : ' + this.transitionName)
    }
  }
})
