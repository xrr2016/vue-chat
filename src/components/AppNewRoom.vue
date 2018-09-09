<template>
<button class="new-room" @click="handleClick">新建房间</button>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppNewRoom',
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    handleClick() {
      // this.currentUser.createRoom({
      //     name: 'general',
      //     private: true,
      //     addUserIds: ['craig', 'kate']
      //   }).then(room => {
      //     console.log(`Created room called ${room.name}`)
      //   })
      //   .catch(err => {
      //     console.log(`Error creating room ${err}`)
      //   })
    }
  }
}
</script>

<style scoped>
.new-room {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: none;
  border-right: 1px solid #eee;
}
</style>
