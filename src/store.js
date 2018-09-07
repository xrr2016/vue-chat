import Vue from 'vue'
import Vuex from 'vuex'

import AppService from './service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    rooms: [],
    users: [],
    messages: [],
    theme: 'light',
    layout: 'normal'
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user
    }
  },
  actions: {
    async createUser({ commit }, username) {
      const user = await AppService.createUser(username)
      commit('setCurrentUser', user)
      return Promise.resolve(user)
    }
  }
})
