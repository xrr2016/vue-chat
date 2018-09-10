<template>
<form class="send-message"  v-if="currentRoom" @submit.prevent="handleSubmit">
  <input class="input" :class="{ 'input--dark' : darkTheme}" type="text" v-model="text" autofocus required placeholder="说点什么..." />
  <button class="button" :class="{ 'button--dark' : darkTheme}" type="submit">发送</button>
  <Spin fix v-if="isSending"></Spin>
</form>
<div class="no-current-room" v-else>还没有加入房间</div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'AppSendMessage',
  data() {
    return {
      text: '',
      isTyping: false,
      isSending: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'currentRoom', 'darkTheme'])
  },
  methods: {
    handleSubmit() {
      if (!this.text || this.isSending) {
        return
      }
      this.isSending = true
      this.currentUser
        .sendMessage({
          text: this.text,
          roomId: this.currentRoom.id
        })
        .then(messageId => {
          this.text = ''
          this.isSending = false
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.send-message {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.input {
  flex: 1;
  height: 100%;
  font-size: 2.4rem;
  border: none;
  outline: none;
  padding: 1em;
}

.button {
  width: 16rem;
  height: 100%;
  border: none;
  color: #666;
  font-size: 2rem;
  font-weight: bold;
  border-left: 1px solid #eee;
}

.input--dark, .button--dark {
  color: #fff;
  background-color: #333;
}

.no-current-room {
  display: grid;
  justify-content: center;
  align-items: center;
  color: #666;
  text-align: center;
}
</style>
