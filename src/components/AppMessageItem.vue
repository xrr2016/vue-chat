<template>
<li class="message" :class="{ 'message--self': currentUser.id === message.senderId }">
  <p class="meta">{{ message.senderId }}&nbsp;&nbsp;{{ message.createdAt }}</p>
  <p class="text">{{ message.text }}</p>
</li>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppMessageItem',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style scoped>
.message {
  max-width: 95%;
  padding: 1em;
  color: #666;
  border-radius: 4px;
  list-style: none;
}

.message--self {
  align-self: flex-end;
}

.text {
  color: #333;
  margin-top: 4px;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.5;
}
</style>
