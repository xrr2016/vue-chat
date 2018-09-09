<template>
<ul class="room-list">
  <div v-if="isLoading && rooms">Loading...</div>
  <template v-else>
    <li class="room-item room-item--active" v-if="currentRoom">
      <span class="title">{{ currentRoom.name }}</span>
      <span class="number">{{ currentRoom.userIds.length }}</span>
    </li>
    <li class="room-item" v-for="room of rooms" :key="room.id" @click="handleClick">
      <span class="title">{{ room.name }}</span>
      <span class="number">{{ room.userIds.length }}</span>
    </li>
  </template>
</ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppRoomList',
  computed: {
    ...mapState(['isLoading', 'rooms', 'currentRoom'])
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style scoped>
.room-list {
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

.room-list:hover .room-item:not(:hover) {
  opacity: 0.6;
}

.room-item--active {
  background-color: #eee;
}

.number {
  color: #999;
}
</style>
