<template>
<div class="current-user">
  <div class="avatar">{{ currentUser.name[0] }}</div>
  <p class="name">{{ currentUser.name }} </p>
  <Dropdown placement="bottom-start">
    <Icon type="ios-menu" size="24" />
    <DropdownMenu slot="list">
      <DropdownItem>
        <span style="padding-right: 1rem;">夜间模式</span>
        <i-switch v-model="nightMode">
          <span slot="open">On</span>
          <span slot="close">Off</span>
        </i-switch>
      </DropdownItem>
      <DropdownItem>退出</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppCurrentUser',
  computed: {
    ...mapState(['currentUser', 'isLoading'])
  },
  data() {
    return {
      nightMode: false
    }
  },
  watch: {
    nightMode: 'toggleDarkTheme'
  },
  methods: {
    ...mapMutations(['toggleDarkTheme'])
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
