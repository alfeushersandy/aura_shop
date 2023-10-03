//import vue router
import { createRouter, createWebHistory } from "vue-router";

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
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */  '../views/dashboard/Index.vue')
        //check harus login
        // meta: {
        //     requiresAuth: true
        // }
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

export default router