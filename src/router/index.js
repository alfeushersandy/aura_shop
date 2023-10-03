//import vue router
import { createRouter, createWebHistory } from "vue-router";

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
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/Login.vue')
    }
]

//create router 
const router = createRouter({
    history: createWebHistory(),
    routes 
})

export default router