import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Chatkit = require('@pusher/chatkit')
const config = require('../config')

export const CHAT_USER_INFO = 'CHAT_USER_INFO'
export const CHAT_LAST_ROOM_ID = 'CHAT_LAST_ROOM_ID'

const store = new Vuex.Store({
  state: {
    isLoading: false,
    userInfo: null,
    currentUser: null,
    currentRoom: null,
    lastRoom: null,
    rooms: [],
    users: [],
    messages: [],
    typingUsers: [],
    theme: 'light',
    layout: 'normal',
    errorMessage: ''
  },
  mutations: {
    setLoading(state) {
      state.isLoading = true
    },
    setLoaded(state) {
      state.isLoading = false
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage
    },
    clearErrorMessage(state) {
      state.errorMessage = ''
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    clearUserInfo(state) {
      state.userInfo = null
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
    async createUser({ commit, dispatch }, username) {
      commit('setLoading')
      const result = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      })
        .then(res => res.json())
        .catch(error => error)

      if (result.success) {
        const user = result.user
        dispatch('initChatApp', user.name)
        localStorage.setItem(CHAT_USER_INFO, JSON.stringify(user))
      } else {
        if (result.message === 'User with given id already exists') {
          commit('setErrorMessage', '用户已存在请重试')
        } else {
          commit('setErrorMessage', result.message)
        }
        commit('setLoaded')
      }
    },
    async initChatApp({ commit }, userId, lastRoomId) {
      commit('setLoading')
      const chatManager = new Chatkit.ChatManager({
        userId,
        instanceLocator: config.CHATKIT_INSTANCELOCATOR,
        tokenProvider: new Chatkit.TokenProvider({
          url: `${config.SERVER_HOST}:${config.SERVER_PORT}/auth`
        })
      })

      const currentUser = await chatManager.connect().catch(error => {
        commit('setErrorMessage', error.message)
      })
      const rooms = await currentUser.getJoinableRooms()

      commit('setCurrentUser', currentUser)
      commit('setRooms', rooms)

      if (lastRoomId) {
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
        commit('setCurrentRoom', currentRoom)
      }

      commit('setLoaded')
    }
  }
})

try {
  const userInfo = JSON.parse(localStorage.getItem(CHAT_USER_INFO))
  const lastRoomId = JSON.parse(localStorage.getItem(CHAT_LAST_ROOM_ID))

  if (userInfo) {
    store.commit('setUserInfo', userInfo)
    store.dispatch('initChatApp', userInfo.name, lastRoomId)
  }
} catch (error) {
  console.log(error)
}

export default store
