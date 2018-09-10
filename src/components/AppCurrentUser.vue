<template>
<div class="current-user">
  <div v-if="isLoading">Loading...</div>
  <template v-else>
    <div class="avatar">{{ currentUser.name[0] }}</div>
    <p class="name">{{ currentUser.name }} </p>
    <Icon type="ios-menu" size="24" />
  </template>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppCurrentUser',
  computed: {
    ...mapState(['currentUser', 'isLoading'])
  },
  filters: {
    createAt(dateStr) {
      // console.log(dateStr)
      // return new D
    }
  }
}
</script>

<style scoped>
.current-user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 30px;
  height: 30px;
  margin-right: 0.4rem;
  line-height: 30px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background-color: #333;
}

.name {
  flex: 1;
  color: #666;
  font-size: 1.4rem;
}
</style>
