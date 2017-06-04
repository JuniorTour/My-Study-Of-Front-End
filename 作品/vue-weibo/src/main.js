// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
Vue.use(Router)
import Login from '@/pages/Login/Login.vue'
import Home from '@/pages/Home/Home.vue'
import Message from '@/pages/Message/Message.vue'
import Discovery from '@/pages/Discovery/Discovery.vue'
import Me from '@/pages/Me/Me.vue'
import NotFound from '@/pages/NotFound/NotFound.vue'
// import router from './router'

import './assets/stylus/index.styl'

Vue.config.productionTip = true

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      // component: Login
      component: Home
    },
    {
      path: '/message',
      name: 'Message',
      // component: Login
      component: Message
    },
    {
      path: '/discovery',
      name: 'Discovery',
      // component: Login
      component: Discovery
    },
    {
      path: '/me',
      name: 'Me',
      // component: Login
      component: Me
    },
    {
      path: '*',
      name: NotFound,
      component: NotFound
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  watch: {
    '$router'(to, from) {
      console.log('toDepth : ')
      const routerOrder = ['/home', '/message', '/discovery', '/me']
      const toDepth = routerOrder.indexOf(to.path)
      const fromDepth = routerOrder.indexOf(from.path)

      // 根据路由深度，来判断是该从右侧进入还是该从左侧进入
      this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
    }
  }
})
