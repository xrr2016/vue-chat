<template>
  <main id="app">
    <app-new-user class="new-user" />
  </main>
</template>

<script>
import AppNewUser from './components/AppNewUser'

export default {
  name: 'App',
  components: {
    AppNewUser: AppNewUser
  }
}
</script>

<style scoped>
#app {
  display: grid;
  background-color: aliceblue;
}
.new-user {
  width: 200px;
  height: 100px;
  background-color: aqua;
}
</style>

