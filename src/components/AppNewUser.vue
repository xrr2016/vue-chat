<template>
<section class="new-user">
  <div class="mdl-progress mdl-progress__indeterminate" style="width: 100%;"></div>
  <h2 class="new-user__title">你的名字是？</h2>
  <form class="new-user__form" @submit.prevent="handleSubmit">
    <input class="mdl-textfield__input new-user__input" type="text" v-model="username"  placeholder="Enter Your Name"/>
  </form>
</section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AppNewUser',
  data() {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['createUser']),
    handleSubmit() {
      this.createUser(this.username)
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
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.new-user__title {
  margin-top: 10%;
  color: #666;
  font-size: 3rem;
  text-align: center;
}

.new-user__input {
  width: 720px;
  color: #333;
  padding: 1em;
  text-align: center;
  outline: none;
}
</style>
