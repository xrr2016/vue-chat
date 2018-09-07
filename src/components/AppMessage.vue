<template>
  <li class="message" :class="{ 'message--self': message.self }">
    <p class="meta">{{ message.name }}&nbsp;&nbsp;{{ message.time }}</p>
    <p class="text">{{ message.text }}</p>
  </li>
</template>

<script>
export default {
  name: 'AppMessage',
  props: {
    message: {
      type: Object,
      required: true
    }
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

.content {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.text {
  color: #333;
  margin-top: 4px;
  font-size: 2rem;
}
</style>
