//import vue router
import { createRouter, createWebHistory } from "vue-router";

import NProgress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css'

//import store vuex
import store from '../store'

//define routes
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
    },
    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */  '../views/dashboard/Index.vue'),
        //check harus login
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order',
        name: 'order',
        component: () => import(/*webpackChunkName: "order" */ '../views/order/Index.vue'),
        //check harus login
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: () => import(/* webpackChunkName: "detail_order" */ '../views/order/Show.vue'),
        meta: {
          //chek is loggedIn
          requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue')
    },
    {
        path: '/product/:slug',
        name: 'detail_product',
        component: () => import(/* webpackChunkName: "detail_product" */ '../views/product/Show.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import(/* webpackChunkName: "category" */ '../views/category/Index.vue')
    },
    {
        path: '/category/:slug',
        name: 'detail_category',
        component: () => import(/* webpackChunkName: "detail_category" */ '../views/category/Show.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/cart/Index.vue'),
        meta: {
          //chek is loggedIn
          requiresAuth: true
        }
      }
]

//create router 
const router = createRouter({
    history: createWebHistory(),
    routes 
})

//function terkait requireAuth
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        //cek nilai dari getter isLoggedIn di module Auth pada vuex
        if(store.getters['auth/isLoggedIn']) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
  })
  
  router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
  })

export default router