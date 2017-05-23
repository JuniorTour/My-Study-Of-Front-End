import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
/* 来自build/webpack.base.conf.js的定义
 'components': path.resolve(__dirname, '../src/components') */
import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'

Vue.use(VueRouter)

let app = Vue.extend(App)

let router = new VueRouter({
  linkActiveClass: 'active'
})

router.map({
  '/': {
    component: goods
  },
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
})

router.start(app, '#app')

// router.go('/goods')
