<template>
<section class="new-user">
  <div class="user-info" v-if="userInfo">{{ userInfo.name }}</div>
  <form class="new-user__form" v-else @submit.prevent="handleSubmit">
    <input class="new-user__input" @focus="handleFoucs" @input="handleInput" @blur="handleBlur" v-model="username" placeholder="输入你的名字" autofocus required />
  </form>
  <div class="new-user__stat">
    <span class="new-user__donut" v-if="isLoading"></span>
    <small class="new-user__error" v-if="errorMessage.length">{{ errorMessage }}</small>
  </div>
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
    ...mapState(['isLoading', 'errorMessage', 'userInfo'])
  },
  methods: {
    ...mapActions(['createUser']),
    ...mapMutations(['clearErrorMessage', 'setLoaded']),
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.user-info {
  margin-bottom: 1rem;
}

.new-user__form {
  margin-top: -180px;
  margin-bottom: 1rem;
}

.new-user__stat {
  width: 100%;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.new-user__input {
  width: 960px;
  color: #333;
  padding: 1em;
  font-size: 2rem;
  text-align: center;
  outline: none;
  border: none;
  border-bottom: 1px solid #999;
}

.new-user__donut {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: grey;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-bottom: 4px;
  animation: donut-spin 1.2s linear infinite;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.new-user__error {
  color: red;
  min-height: 20px;
}
</style>
