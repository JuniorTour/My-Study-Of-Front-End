// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入 pages 下的 Home.vue
import Home from './pages/home.vue'
import Detail from './pages/detail.vue'

Vue.config.productionTip = false

const routes = [
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/',
    component: Home
  }
]

// let routerDepth = ['/']
/*这样做还是不好，需要作者在写路由时，按顺序写，不方便。
* 应该要能不按顺序写也能分别出路径的深度。*/
// routes.forEach(function (val, index) {
//   console.log(val.path)
//   if (val.path!=='/') {
//
//   }
//   routerDepth.push(val.path)
//   console.log(routerDepth)
// })

// 创建路由实例
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 在vue实例配置中，启用router
  data(){
    return {
      transitionName: 'slide'
    }
  },
  watch: {
    // 监视路由，参数为要目标路由和当前页面的路由
    '$route' (to, from){
      // console.log('to.path : ' + to.path)
      // console.log('to.path.substring(0, to.path.length - 2) : ' + to.path.substring(0, to.path.length - 2))
      // console.log('from.path : ' + from.path)
      // console.log('from.path.substring(0, from.path.length - 2) : ' + from.path.substring(0, from.path.length - 2))

      /*这个方式非常不优雅！
       * 现在我有两种思路：
       * 1.声明一个routerDepth数组变量，通过根据routes动态生成该数组的元素，用于此处以indexOf匹配路径深度。
       * 2.仍使用官方文档的split方法，特殊对待'/'路径。
       * 3.把'/'路径改成''空路径，可以访问，但是动画效果不对！*/

      // const toDepth = to.path.substring(0, to.path.length - 2).split('/').length
      // // 官方给出的例子为 const toDepth = to.path.split('/').length 由于现在只有两个路由路径'/'和'/detail'
      // // 按照官方给的例子，这两个路由路径深度都为 2 ，所以，这里稍作调整，不知道有什么不妥
      // // 但目前在这个demo中能正常运行，如果知道更好的方法，欢迎留言赐教
      // const fromDepth = from.path.substring(0, from.path.length - 2).split('/').length

      //官方文档方法：
      // console.log('to.path : ' + to.path)
      // console.log('to.path.length : ' + to.path.length)
      // console.log('from.path : ' + from.path)
      // console.log('from.path.length : ' + from.path.length)

      /*特殊处理'/' 和 ‘’ 路由路径，
      *如果处理到这两个路径，总是把它们当做最浅层的路径，把相应的depth记作0。
      * 从而使得其他的所有路径，即使是同级的 '/detail' ，相应的depth为2，也比这两个路径比较起来更深，以应用上正确的过渡动画。*/
      const toDepth = ((to.path.length) <= 1) ? 0 : to.path.split('/').length
      const fromDepth = ((from.path.length) <= 1) ? 0 : from.path.split('/').length
      // 根据路由深度，来判断是该从右侧进入还是该从左侧进入
      this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide'
    }
  }
})
