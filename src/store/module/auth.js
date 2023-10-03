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

            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token
            Api.get('/user')
            .then(response => {
                //commit ke mutation GET_USER untuk merubah/mengirim state
                commit('GET_USER', response.data.user)
            })
        }, 

        logout({commit}) {
            //define callback promise
            return new Promise((resolve) => {
                //commit ke mutation AUTH_LOGOUT
                commit('AUTH_LOGOUT')

                //remove value dari local storage
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                //delete header axios
                delete Api.defaults.headers.common['Authorization']

                //return resolve ke component
                resolve()

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