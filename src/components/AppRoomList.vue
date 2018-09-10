<template>
<ul class="room-list">
    <li class="room-item" :class="{'room-item--active': room.id  === activeRoomId, 'room-item--dark': darkTheme, 'room-item--active-dark': room.id  === activeRoomId && darkTheme}" v-for="room of rooms" :key="room.id" @click="handleClick(room)">
      <span class="title">{{ room.name }}</span>
      <span class="number">{{ room.userIds.length }}</span>
    </li>
     <Spin fix v-if="isLoading"></Spin>
</ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppRoomList',
  computed: {
    ...mapState(['isLoading', 'rooms', 'currentUser', 'darkTheme'])
  },
  data() {
    return {
      activeRoomId: ''
    }
  },
  methods: {
    ...mapActions(['leaveRoom', 'joinRoom', 'subscribeRoom', 'fetchRoomMessages']),
    async handleClick(room) {
      const roomId = room.id
      if (roomId === this.activeRoomId) {
        return
      }
      this.activeRoomId = roomId
      this.$Loading.start()
      await this.joinRoom(roomId)
      await this.fetchRoomMessages(roomId)
      await this.subscribeRoom(roomId)
      this.$Loading.finish()
    }
  }
}
</script>

<style scoped>
.room-list {
  position: relative;
  min-height: calc(100vh - 130px);
  max-height: calc(100vh - 130px);
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.room-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  padding: 1.2em;
  font-size: 2rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.room-item:hover {
  background-color: #eee;
}

.room-item--active {
  background-color: #eee;
}

.room-item--active-dark {
  color: #fff;
  background-color: #333;
}

.number {
  color: #999;
}
</style>
