import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

axios.defaults.baseURL ='https://vuejs-axios-demo.firebaseio.com'
axios.defaults.headers.get['Accepts'] = 'application/json'

const reqItercept = axios.interceptors.request.use(config => {
  console.log("Request Intercept:",config)
  return config
})

const respItercept = axios.interceptors.response.use(resp => {
  console.log("Response Intercept:",resp)
  return resp
})

axios.interceptors.request.eject(reqItercept)
axios.interceptors.response.eject(respItercept)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
