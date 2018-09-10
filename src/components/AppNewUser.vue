<template>
<section class="new-user">
  <form class="new-user__form" @submit.prevent="handleSubmit">
    <input class="new-user__input" @focus="handleFoucs" @input="handleInput" @blur="handleBlur" v-model="username" placeholder="输入你的名字" autofocus required />
  </form>
  <div class="new-user__error" v-if="errorMessage.length">{{ errorMessage }}</div>
</section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AppNewUser',
  data() {
    return {
      username: '',
      hasUser: false,
      isFoucs: true
    }
  },
  computed: {
    ...mapState(['isLoading', 'errorMessage'])
  },
  methods: {
    ...mapActions(['createUser']),
    ...mapMutations(['clearErrorMessage']),
    handleFoucs() {
      this.isFoucs = true
      this.clearErrorMessage()
    },
    handleBlur() {
      this.isFoucs = false
    },
    handleInput() {
      this.clearErrorMessage()
    },
    async handleSubmit() {
      this.$Loading.start()
      await this.createUser(this.username)
      this.$Loading.finish()
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.new-user__form {
  width: 95%;
  max-width: 720px;
  margin-top: 200px;
  margin-bottom: 1rem;
}

.new-user__input {
  width: 100%;
  color: #333;
  padding: 1em;
  font-size: 2rem;
  text-align: center;
  outline: none;
  border: none;
  border-bottom: 1px solid #999;
}

.new-user__error {
  color: red;
  min-height: 20px;
}
</style>
