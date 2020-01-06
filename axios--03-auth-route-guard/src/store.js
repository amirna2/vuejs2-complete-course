import Vue from 'vue'
import Vuex from 'vuex'
import authAxios from './axios-auth'
import appAxios from 'axios' 
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      console.log('authUser::userData = ',userData)
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null
      state.userId = null
    }
  },
  actions: {
    setLogoutTimer({commit, dispatch}, expirationTime) {
      setTimeout( () =>{
        dispatch('logout')
      },expirationTime * 1000)
    },
    signup({commit, dispatch}, authData) {
      console.log('signing up....')
      authAxios.post(
        ':signUp?key=AIzaSyDKH61hq1zoat34fPuvTG1-nOqVpqKdBok',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => {
        console.log('signing up: success')
        console.log(res)
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId 
        })
        // persist session data if we navigate away
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000 )
        sessionStorage.setItem('token', res.data.idToken)
        sessionStorage.setItem('userId', res.data.localId)
        sessionStorage.setItem('expirationDate', expirationDate)
        dispatch('storeUser', authData)
        dispatch('setLogoutTimer', res.data.expiresIn)
      })
      .catch(error => {
        console.log('signing up: failed!')
        console.log(error) 
      })
    },
    login({commit, dispatch}, authData) {
      console.log('log in....')
      authAxios.post(
        ':signInWithPassword?key=AIzaSyDKH61hq1zoat34fPuvTG1-nOqVpqKdBok',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => {
        console.log('login: successful')
        console.log(res)
        const now = new Date()
        const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000 )
        sessionStorage.setItem('token', res.data.idToken)
        sessionStorage.setItem('userId', res.data.localId)
        sessionStorage.setItem('expirationDate', expirationDate)
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId 
        })
        dispatch('setLogoutTimer', res.data.expiresIn)
      })
      .catch(error => {
        console.log('login: failed')
        console.log(error)
      })
    },
    tryAutologin({commit}) {
      const token = sessionStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = sessionStorage.getItem('expirationDate')
      const now = Date()
      if (now >= expirationDate) {
        return
      }
      const userId = sessionStorage.getItem('userId') 
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout({commit}) {
      commit('clearAuthData')
      sessionStorage.removeItem('expirationDate')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userData')
      router.replace('/signin')
    },
    storeUser({commit, state}, userData) {
      if (!state.idToken) {
        console.log('storeUser: no idToken saved')
        return
      }
      console.log('storeUser....')
      appAxios.post('/users.json' + '?auth=' + state.idToken, userData)
      .then(res => {
        console.log('storeUser: successful')
        console.log(res)
      })
      .catch(error => {
        console.log("storeUser: failed!!")
        console.log(error)
      })
    },
    fetchUser ({commit, state}) {
      if (!state.idToken) {
        console.log('fetchUser: no idToken saved')
        return
      }
      console.log('fetchUser....')
      appAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log('fetchUser: successful')
          const data = res.data
          console.log('response data:', data)

          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUser', users[0])
        })
        .catch(error => {
          console.log('fetchUser: failed!')
          console.log(error)
        })
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.idToken !== null
    }
  }
})