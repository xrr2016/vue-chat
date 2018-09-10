<template>
<ul class="message-list" ref="messages">
    <app-message-item v-for="(message, index) of messages" :key="index" :message="message" />
</ul>
</template>

<script>
import { mapState } from 'vuex'
import AppMessageItem from './AppMessageItem'

export default {
  name: 'AppMessageList',
  components: {
    AppMessageItem
  },
  computed: {
    ...mapState(['messages'])
  }
}
</script>

<style scoped>
.loading {
  display: grid;
  justify-content: center;
  align-items: center;
}
.message-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
  max-height: calc(100vh - 100px);
  min-height: calc(100vh - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
</style>
