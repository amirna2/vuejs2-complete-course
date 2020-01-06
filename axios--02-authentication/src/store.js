import Vue from 'vue'
import Vuex from 'vuex'
import authAxios from './axios-auth'
import appAxios from 'axios' 
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
    }
  },
  actions: {
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
        dispatch('storeUser', authData)
      })
      .catch(error => {
        console.log('signing up: failed!')
        console.log(error) 
      })
    },
    login({commit}, authData) {
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
        commit('authUser', {
          token: res.data.idToken,
          userId: res.data.localId 
        })
      })
      .catch(error => {
        console.log('login: failed')
        console.log(error)
      })
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
    }
  }
})