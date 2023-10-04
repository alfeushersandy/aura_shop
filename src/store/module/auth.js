import Api from '../../api/Api'

const auth = {
    //set namespace
    namespaced: true,

    //state 
    state: {
        //state untuk token, pakai localStorage, untuk menyimpan informasi tentang token JWT
        token: localStorage.getItem('token') || '',

        //state user, pakai localStorage, untuk menyimpan data user yang sedang login
        user: JSON.parse(localStorage.getItem('user')) || {}, 
    },

    //mutation
    mutations: {
        //update state token dan user hasil dari response 
        AUTH_SUCCESS(state, token, user) {
            state.token = token 
            state.user = user 
        },

        GET_USER(state, user){
            state.user = user
        },

        AUTH_LOGOUT(state) {
            state.token = ''
            state.user = {}
        }
     }, 

    //actions
    actions: {
        //action register 
        register({commit}, user){
            //define callback promise
            return new Promise((resolve, reject) => {
                //send data ke server 
                Api.post('/register', {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation
                })

                .then(response => {
                    const token = response.data.token 
                    const user = response.data.user 

                    //simpan ke local user 
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))

                    //default header axios dengan token 
                    Api.defaults.headers.common['Authorization'] ="Bearer " + token

                    //commit/merubah state ke mutation 
                    commit('AUTH_SUCCESS', token, user)

                    //commit get user ke mutation
                    commit('GET_USER', user)                    

                    //resolve ke componen dengan hasil response 
                    resolve(response)
                }).catch(error => {
                    //jika gagal remove local storage token 
                    localStorage.removeItem('token')

                    //jalankan reject 
                    reject(error.response.data)
                })
            })
        },

        getUser({commit}) {
            //ambil data token dari localstorage
            const token = localStorage.getItem('token')

            Api.defaults.headers.common['Authorization'] = "Bearer " + token
            Api.get('/user')
            .then(response => {
                //commit ke mutation GET_USER untuk merubah/mengirim state
                commit('GET_USER', response.data.user)
            })
        }, 

        //fungsi logout
        logout({ commit }) {
                    
            //define callback promise
            return new Promise((resolve) => {
                    
                //commit ke mutation AUTH_LOGOUT
                commit('AUTH_LOGOUT')
        
                //remove value dari localStorage
                localStorage.removeItem('token')
                localStorage.removeItem('user')
        
                /**
                * commit ke module cart, untuk set mutation dan state cart menjadi kosong
                */
                commit('cart/GET_CART', 0, { root: true }) // <-- kita tambahkan root menjadi true, karena beda modulue
                commit('cart/TOTAL_CART', 0, { root: true }) // <-- kita tambahkan root menjadi true, karena beda modulue
        
                //di atas kita set data-nya menjadi 0
        
                //delete header axios
                delete Api.defaults.headers.common['Authorization']
        
                //return resolve ke component 
                resolve()
        
            })
        },

        //action login
        login({ commit }, user) {

            //define callback promise
            return new Promise((resolve, reject) => {
                    
            Api.post('/login', {
                            
            //data yang dikirim ke server
            email: user.email,
            password: user.password,
                
            })
                            
            .then(response => {
                
            //define variable dengan isi hasil response dari server
            const token = response.data.token
            const user  = response.data.user
                
            //set localStorage untuk menyimpan token dan data user
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
                
            //set default header axios dengan token
            Api.defaults.headers.common['Authorization'] = "Bearer " + token

            //commit auth success ke mutation
            commit('AUTH_SUCCESS', token, user)

            //commit get user ke mutation
            commit('GET_USER', user)

            /**
             * commit cart total dan cart count ke state yang ada di module cart
             */

            //get dat cart
            Api.get('/cart')
            .then(response => {
                                
                //commit mutation GET_CART
                commit('cart/GET_CART', response.data.cart, { root: true }) // <-- kita tambahkan root menjadi true, karena beda modulue

            })

            //get total cart
            Api.get('/cart/total')
            .then(response => {
                                
                    //commit mutation TOTAL_CART
                    commit('cart/TOTAL_CART', response.data.total, { root: true }) // <-- kita tambahkan root menjadi true, karena beda modulue

            })

            //resolve ke component dengan hasil response
            resolve(response)
                
            }).catch(error => { 
                
                    //jika gagal, remove localStorage dengan key token
                    localStorage.removeItem('token')

                    //reject ke component dengan hasil response
                    reject(error.response.data)
                
                })

        })

        }
    }, 

    //getters
    getters: {
        //get current user
        currentUser(state) {
            return state.user // <-- return dengan data user
        },

        //loggedIn
        isLoggedIn(state) {
            return state.token // return dengan data token
        },

    }
}

export default auth