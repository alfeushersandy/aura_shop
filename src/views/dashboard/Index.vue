<template>
    <div class="container-fluid mb-5 mt-4" style="min-height: 51vh;">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu />
            </div>
            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="font-weight-bold"> <i class="fas fa-tachometer-alt"></i> DASHBOARD</h5>
                        <hr>
                        Selamat Datang <strong>{{ user.name }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //import customer menu component
    import CustomerMenu from '../../components/CustomerMenu.vue'
    //import usestore
    import { useStore } from 'vuex';
    //import onMounted, computed
    import { onMounted, computed, reactive } from 'vue';

    export default {

        name: 'DashboardComponent',

        components: {
            //customer menu component
            CustomerMenu
        },

        setup() {
            //inisiasi store vuex
            const store = useStore()

            //ketika componen dirender pertama kali
            onMounted(() => {
                //panggil action getUser dari module Auth
                store.dispatch('auth/getUser')
            })

            //computed
            const user = computed(() => {
                //panggil getter currentUser dari module Auth
                return store.getters['auth/currentUser']
            })

            //return semua yang digunakan
            return {
                store,
                user
            }
        }

    }
</script>