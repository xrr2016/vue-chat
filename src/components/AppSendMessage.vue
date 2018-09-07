<template>
<form class="send-message" @submit.prevent="handleSubmit">
  <input class="input" type="text" v-model="text" placeholder="说点什么..." />
  <button class="button" type="submit">发送</button>
</form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppSendMessage',
  data() {
    return {
      text: '',
      isTyping: false,
      isSending: false
    }
  },
  watch: {
    text: 'handleChange'
  },
  computed: {
    ...mapState(['currentUser', 'currentRoom'])
  },
  methods: {
    ...mapMutations(['addTypingUser', 'removeTypingUser']),
    handleChange(text, prevText) {
      this.addTypingUser(this.currentUser)
      const timeout = setTimeout(() => {
        // if (text === prevText) {
        this.removeTypingUser(this.currentUser)
        // }
        clearTimeout(timeout)
      }, 1000)
      console.log(this.currentRoom.id)
      this.currentUser
        .isTypingIn({
          roomId: this.currentRoom.id
        })
        .catch(error => console.error(error))
    },
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
          console.log(messageId)
        })
        .then(() => {
          const timeout = setTimeout(() => {
            this.isSending = false
            clearTimeout(timeout)
          }, 500)
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.send-message {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}

.input {
  flex: 1;
  font-size: 2.4rem;
  border: none;
  outline: none;
  padding: 1em;
  text-decoration: underline;
}

.button {
  width: 16rem;
  border: none;
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  background-color: slateblue;
}
</style>
