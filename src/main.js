import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
//import router
import router from './router';
//import store vuex
import store from './store';


const app = createApp(App)

//gunakan router di vuejs 
app.use(router)

//gunakan store vuex
app.use(store)

//define mixins for global function 
app.mixin({
    methods: {
        //moneythousand
        moneyFormat(number){
            let val = (number/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        //calculate discount
        calculateDiscount(product){
            return product.price - (product.price * (product.discount)/100)
        } 
    }
})


app.mount('#app')
