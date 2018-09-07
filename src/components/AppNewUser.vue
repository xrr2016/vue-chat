<template>
<section class="new-user">
  <div class="new-user__content">
    <h2 class="new-user__title">你的名字是？</h2>
    <p v-show="isCreating">创建中</p>
    <p v-show="isDone">创建完毕</p>
    <form @submit.prevent="handleSubmit">
      <input class="input is-primary" type="text" v-model="username" />
    </form>
  </div>
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
.new-user {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.15);
}
.new-user__content {
  width: 480px;
  height: 320px;
  padding: 32px;
  transform: translateY(-50%);
  background-color: #fff;
  box-shadow: 0 0 2px #eee;
}
</style>
