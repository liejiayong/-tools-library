import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vue',
    name: 'vue',
    component: () => import(/* webpackChunkName: "Vue" */ '../components/Vue.vue')
  },
  {
    path: '/react',
    name: 'react',
    component: () => import(/* webpackChunkName: "react" */ '../components/React.vue')
  },
  {
    path: '/angular',
    name: 'angular',
    component: () => import(/* webpackChunkName: "angular" */ '../components/Angular.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
