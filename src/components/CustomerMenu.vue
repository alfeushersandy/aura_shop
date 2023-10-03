<template>
    <div class="card border-0 rounded shadow">
      <div class="card-body">
          <h5 class="font-weight-bold">MAIN MENU</h5>
          <hr>
          <ul class="list-group">
              <router-link :to="{name: 'dashboard' }" class="list-group-item text-decoration-none text-dark text-uppercase"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link>
              <a href="#" class="list-group-item text-decoration-none text-dark text-uppercase"><i class="fas fa-shopping-cart"></i> My Order</a>
              <a @click="logout" style="cursor:pointer" class="list-group-item text-decoration-none text-dark text-uppercase"><i class="fas fa-sign-out-alt"></i> Logout</a>
          </ul>
      </div>
    </div>
  </template>
  
  <script>
  import {useStore} from 'vuex'
  import {useRouter} from 'vue-router'

  export default {
      name: 'CustomerMenuComponent',

      setup() {
        //inisiasi store 
        const store = useStore()
        //inisiasi router
        const router = useRouter()
        //method logout
        function logout()
        {
            //panggil action logout di modul Auth
            store.dispatch('auth/logout')
            .then(() => {
                router.push({
                    name: 'login'
                })
            })
        }
        return {
            store,
            router,
            logout
        }
      }
  }
  </script>