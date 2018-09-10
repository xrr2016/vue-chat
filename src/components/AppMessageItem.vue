<template>
<li class="message" ref="item" :class="{ 'message--self': currentUser.id === message.senderId}">
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
    ...mapState(['currentUser', 'darkTheme'])
  },
  mounted() {
    this.$refs.item.scrollIntoView()
  }
}
</script>

<style scoped>
.message {
  max-width: 95%;
  padding: 1em;
  border-radius: 4px;
  list-style: none;
}

.message--self {
  align-self: flex-end;
}

.meta {
  color: #666;
}

.text {
  margin-top: 4px;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.5;
}
</style>
