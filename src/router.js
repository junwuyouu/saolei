import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/Saolei.vue')
    },
    {
      path: '/eluosi',
      name: 'eluuosi',
      component: () => import('./views/Eluosi.vue')
    },
    {
      path: '/snake',
      name: 'snake',
      component: () => import('./views/Snake.vue')
    },
  ]
})
