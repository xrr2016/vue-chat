<template>
  <form class="send-message" @submit.prevent="handleSubmit">
    <input class="input" type="text" v-model="text" />
    <button class="button" type="submit">发送</button>
  </form>
</template>

<script>
export default {
  name: 'AppSendMessage',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleSubmit() {}
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
