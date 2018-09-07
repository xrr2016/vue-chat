import Vue from 'vue'
import Vuex from 'vuex'

import AppService from './service'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: true,
    currentUser: null,
    rooms: [],
    users: [],
    messages: [],
    theme: 'light',
    layout: 'normal'
  },
  mutations: {
    setLoaded(state) {
      state.isLoading = false
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    }
  },
  actions: {
    async createUser({ commit }, username) {
      const user = await AppService.createUser(username)
      commit('setCurrentUser', user)
      commit('setLoaded')
      return Promise.resolve(user)
    },
    async initUser({ commit }, username) {
      const user = await AppService.initUser(username)
      console.log(user)
      commit('setCurrentUser', user)
      commit('setLoaded')
      return Promise.resolve(user)
    }
  }
})

store.dispatch('initUser', 'xrr')

export default store
