//import axios
import axios from 'axios'

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://shop.sandingulik.com/api'
})

export default Api