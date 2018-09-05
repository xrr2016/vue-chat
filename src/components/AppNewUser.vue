<template>
  <section class="new-user">
    <h2 class="new-user__title">你的名字是？</h2>
    <form @submit.prevent="createNewUser">
      <input class="new-user__input" type="text" v-model="username" />
    </form>
  </section>
</template>

<script>
export default {
  name: 'AppNewUser',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    createNewUser() {}
  }
}
</script>

<style scoped>
.new-user {

}
</style>
