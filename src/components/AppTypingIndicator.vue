<template>
  <ul class="typing-indicator">
    <li class="typing-item" v-for="user of typingUsers" :key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppTypingIndicator',
  computed: {
    ...mapState(['typingUsers'])
  }
}
</script>

<style scoped>
.typing-indicator {
  max-height: 30px;
  overflow-y: auto;
}
.typing-item {
  line-height: 30px;
  list-style: none;
  text-align: center;
}
</style>
