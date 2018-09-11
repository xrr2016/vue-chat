<template>
<li class="message" ref="item" :class="{ 'message--self': currentUser.id === message.senderId}">
  <p class="meta">{{ message.senderId }} {{ message.createdAt }}</p>
  <p class="text">{{ message.text }}</p>
</li>
</template>

<script>
export default {
  name: 'AppMessageItem',
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.$refs.item.scrollIntoView(false)
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
  opacity: 0.7;
}

.text {
  margin-top: 4px;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.5;
}
</style>
