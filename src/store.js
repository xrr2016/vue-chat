import Vue from 'vue'
import Vuex from 'vuex'
// import Chatkit from '@pusher/chatkit'

import AppService from './service'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: true,
    currentUser: {},
    currentRoom: {},
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
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser
    },
    setCurrentRoom(state, currentRoom) {
      state.currentRoom = currentRoom
    },
    addNewMessage(state, message) {
      state.messages.push(message)
    }
  },
  actions: {
    async createUser({ commit }, username) {
      const user = await AppService.createUser(username)
      commit('setCurrentUser', user)
      commit('setLoaded')
      return Promise.resolve(user)
    },
    async initChatApp({ commit }, username) {
      const currentUser = await AppService.initUser(username)
      const currentRoom = await currentUser.subscribeToRoom({
        roomId: 15624742,
        messageLimit: 100,
        hooks: {
          onNewMessage: message => {
            commit('addNewMessage', message)
          }
        }
      })
      commit('setCurrentUser', currentUser)
      commit('setCurrentRoom', currentRoom)
      commit('setLoaded')
    }
  }
})

store.dispatch('initChatApp', 'Admin')

export default store
