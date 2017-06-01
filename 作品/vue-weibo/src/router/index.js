import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import header from '@/components/header/header.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/header',
      name: 'Header',
      component: header
    }
  ]
})
