<template>
  <ul class="room-list">
    <li class="room-item room-item--active">
      <span class="title">NBA</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Anime</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Game</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Code</span>
      <span class="number">100</span>
    </li>
      <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Anime</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Game</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Code</span>
      <span class="number">100</span>
    </li>
      <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Anime</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Game</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Code</span>
      <span class="number">100</span>
    </li>
      <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Anime</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Game</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Rocket</span>
      <span class="number">100</span>
    </li>
     <li class="room-item">
      <span class="title">Code</span>
      <span class="number">100</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppRoomList'
}
</script>

<style scoped>
.room-list {
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
}

.room-item--active {
  background-color: #eee;
}

.number {
  color: #999;
}
</style>
