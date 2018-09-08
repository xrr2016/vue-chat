<template>
<main id="app">
  <template v-if="currentUser && !isLoading">
    <app-typing-indicator class="typing-indicator" />
    <app-current-user class="current-user" />
    <app-room-list class="room-list" />
    <app-new-room class="new-room" />
    <app-message-list class="message-list" />
    <app-send-message class="send-message" />
  </template>
  <app-new-user v-else />
</main>
</template>

<script>
import { mapState } from 'vuex'

import AppCurrentUser from './components/AppCurrentUser'
import AppMessageList from './components/AppMessageList'
import AppNewRoom from './components/AppNewRoom'
import AppRoomList from './components/AppRoomList'
import AppNewUser from './components/AppNewUser'
import AppSendMessage from './components/AppSendMessage'
import AppTypingIndicator from './components/AppTypingIndicator'

export default {
  name: 'App',
  components: {
    AppCurrentUser,
    AppMessageList,
    AppNewRoom,
    AppNewUser,
    AppRoomList,
    AppSendMessage,
    AppTypingIndicator
  },
  computed: {
    ...mapState(['currentUser', 'isLoading'])
  }
}
</script>

<style scoped>
#app {
  display: grid;
  grid-auto-columns: 300px auto;
  grid-auto-rows: 30px 30px auto 70px;
  grid-template-areas: 'user typing' 'user messages' 'rooms messages' 'new send';
  height: 100vh;
}

.current-user {
  grid-area: user;
}

.room-list {
  grid-area: rooms;
}

.new-room {
  grid-area: new;
}

.message-list {
  grid-area: messages;
}

.typing-indicator {
  grid-area: typing;
}

.send-message {
  grid-area: send;
}
</style>
