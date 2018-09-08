import Vue from 'vue'
import Vuex from 'vuex'

import AppService from './service'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: false,
    currentUser: null,
    currentRoom: null,
    rooms: [],
    users: [],
    messages: [],
    typingUsers: [],
    theme: 'light',
    layout: 'normal'
  },
  mutations: {
    setLoading(state) {
      state.isLoading = true
    },
    setLoaded(state) {
      state.isLoading = false
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser
    },
    setCurrentRoom(state, currentRoom) {
      state.currentRoom = currentRoom
    },
    setRooms(state, joinableRooms) {
      state.rooms = joinableRooms
    },
    addNewMessage(state, message) {
      state.messages.push(message)
    },
    addTypingUser(state, typingUser) {
      if (state.typingUsers.includes(typingUser)) {
        return
      }
      state.typingUsers.unshift(typingUser)
    },
    removeTypingUser(state, typingUser) {
      state.typingUsers = state.typingUsers.filter(user => user.name !== typingUser.name)
    }
  },
  actions: {
    async createUser({ commit }, username) {
      commit('setLoading')
      const user = await AppService.createUser(username)
      commit('setCurrentUser', user)
      commit('initChatApp', user.name)
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
          },
          onUserStartedTyping: user => {
            commit('addTypingUser', user)
          },
          onUserStoppedTyping: user => {
            commit('removeTypingUser', user)
          },
          onUserCameOnline: user => console.log(user),
          onUserWentOffline: user => console.log(user),
          onUserJoined: user => console.log(user)
        }
      })
      const rooms = await currentUser.getJoinableRooms()

      commit('setCurrentUser', currentUser)
      commit('setCurrentRoom', currentRoom)
      commit('setRooms', rooms)
      commit('setLoaded')
    }
  }
})

const currentUser = localStorage.getItem('CHAT_CURRENT_USER')

if (currentUser) {
  store.dispatch('initChatApp', currentUser.name)
}

export default store
