<template>
<div>
  <Modal v-model="showModal" title="请输入房间名" :loading="true" draggable @on-ok="handleClickOk">
    <Input class="room-name" prefix="ios-home-outline" v-model="roomName" autofocus placeholder="房间名" clearable />
  </Modal>
  <button class="new-room-button" @click="handleClick">新建房间</button>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppNewRoom',
  computed: {
    ...mapState(['currentUser'])
  },
  data() {
    return {
      showModal: false,
      roomName: ''
    }
  },
  methods: {
    ...mapActions(['createRoom']),
    handleClick() {
      this.showModal = true
    },
    handleClickOk() {
      this.createRoom(this.roomName)
        .then(res => {
          this.showModal = false
          console.log(res)
        })
        .catch(error => {
          console.log(error)
          this.showModal = false
        })
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

.new-room-button {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
}
.room-name {
  width: 100%;
}
</style>
