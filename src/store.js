import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Chatkit = require('@pusher/chatkit')
const config = require('../config')

const store = new Vuex.Store({
  state: {
    isLoading: false,
    currentUser: null,
    currentRoom: null,
    rooms: [],
    users: [],
    messages: [],
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
    setRooms(state, rooms) {
      state.rooms = rooms
    },
    setJoinableRooms(state, joinableRooms) {
      joinableRooms.forEach(room => {
        state.rooms.push(room)
      })
    },
    addNewRoom(state, room) {
      state.rooms.push(room)
    },
    addNewMessage(state, message) {
      state.messages.push(message)
    },
    setRoomMessages(state, messages) {
      state.messages = messages
    },
    clearRoomMessages(state) {
      state.messages.length = 0
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
      } else {
        if (result.message === 'User with given id already exists') {
          commit('setErrorMessage', '用户已存在请重试')
        } else {
          commit('setErrorMessage', result.message)
        }
        commit('setLoaded')
      }
    },
    async initChatApp({ commit, dispatch }, userId, lastRoomId) {
      commit('setLoading')
      const tokenProvider = new Chatkit.TokenProvider({
        url: `${config.SERVER_HOST}:${config.SERVER_PORT}/auth`
      })
      const chatManager = new Chatkit.ChatManager({
        userId,
        instanceLocator: config.CHATKIT_INSTANCELOCATOR,
        tokenProvider
      })

      const currentUser = await chatManager.connect().catch(error => {
        commit('setErrorMessage', error.message)
      })

      commit('setCurrentUser', currentUser)
      commit('setRooms', currentUser.rooms)
      dispatch('getJoinableRooms')

      if (lastRoomId) {
        dispatch('subscribeRoom', lastRoomId)
      }

      commit('setLoaded')
    },
    async subscribeRoom({ state, commit }, roomId) {
      const currentRoom = await state.currentUser.subscribeToRoom({
        roomId,
        messageLimit: 20,
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
    },
    async getJoinableRooms({ state, commit }) {
      const rooms = await state.currentUser.getJoinableRooms()
      commit('setJoinableRooms', rooms)
    },
    async createRoom({ state, commit }, name) {
      return state.currentUser
        .createRoom({
          name,
          private: false
        })
        .then(room => {
          commit('addNewRoom', room)
          console.log(`Created room called ${room.name}`)
        })
        .catch(err => {
          console.log(`Error creating room ${err}`)
        })
    },
    leaveRoom({ state, commit }, roomId) {
      return state.currentUser
        .leaveRoom({ roomId })
        .then(room => {
          console.log(`Left room with ID: ${room.id}`)
        })
        .catch(err => {
          console.log(`Error leaving room ${err}`)
        })
    },
    joinRoom({ state, commit }, roomId) {
      commit('clearRoomMessages')
      return state.currentUser
        .joinRoom({ roomId })
        .then(room => {
          commit('setCurrentRoom', room)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchRoomMessages({ state, commit }, roomId) {
      return state.currentUser
        .fetchMessages({
          roomId: roomId,
          direction: 'older',
          limit: 10
        })
        .then(messages => {
          commit('setRoomMessages', messages)
        })
        .catch(err => {
          console.log(`Error fetching messages: ${err}`)
        })
    }
  }
})

export default store
