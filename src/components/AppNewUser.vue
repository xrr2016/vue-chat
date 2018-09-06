<template>
  <section class="new-user">
    <h2 class="new-user__title">你的名字是？</h2>
    <p v-show="isCreating">创建中</p>
    <p v-show="isDone">创建完毕</p>
    <form @submit.prevent="handleSubmit">
      <input class="input is-primary" type="text" v-model="username" />
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppNewUser',
  data() {
    return {
      isCreating: false,
      isDone: false,
      username: ''
    }
  },
  methods: {
    ...mapActions(['createUser']),
    handleSubmit() {
      this.isCreating = true
      this.createUser(this.username).then(user => {
        this.isLoading = false
        this.isDone = true
      })
    }
  }
}
</script>

<style scoped>
/* .new-user {

} */
</style>
