<template>
<main class="app" :class="{ 'app--dark' : darkTheme }">
  <section class="chat" v-if="currentUser">
    <div class="chat__current" :class="{ 'chat__current--dark': darkTheme }">
      <Avatar class="avatar" :class="{ 'avatar--dark': darkTheme }">{{ currentUser.name[0] }}</Avatar>
      <span class="name" :class="{ 'name--dark': darkTheme }">{{ currentUser.name }} </span>
      <Dropdown placement="bottom-start" @on-click="dropDownClick">
        <Icon type="ios-menu" size="24" />
        <DropdownMenu slot="list">
          <DropdownItem name="theme">
            <span style="padding-right: 1rem;">夜间模式</span>
            <i-switch v-model="darkTheme">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </DropdownItem>
          <DropdownItem name="logout">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <ul class="chat__users" :class="{ 'chat__users--dark': darkTheme }">
      <li class="user-item" v-for="user of users" :key="user.id">
        <span class="name">{{ user.name }}</span>
        <span class="spot" :class="{ 'spot--online': user.online }"></span>
      </li>
    </ul>
    <div class="chat__hint" :class="{ 'chat__hint--dark': darkTheme }">{{ hint }}</div>
    <ul class="chat__messages" :class="{'chat__messages--dark': darkTheme }">
      <message-item v-for="(message, index) of messages" :key="index" :message="message" :currentUser="currentUser" />
    </ul>
    <form class="chat__send" @submit.prevent="sendMessage">
      <input class="input" :class="{ 'input--dark': darkTheme }" type="text" v-model="newMessage" autofocus required placeholder="说点什么..." />
      <button class="button" :class="{ 'button--dark': darkTheme }" type="submit">发送</button>
      <Spin fix v-if="isSendingMessage"></Spin>
    </form>
  </section>
  <section class="create" v-else>
    <template v-if="createdUsers.length">
      <p class="create__title">选择一个用户</p>
      <div class="create__users">
        <Button class="create__user" size="small" v-for="(user, index) of createdUsers" :key="index" @click="chooseUser(user)">{{ user.name }}</Button>
      </div>
      <p class="create__or">OR</p>
    </template>
    <form class="create__form" :class="{ 'create__form--top': createdUsers.length }" @submit.prevent="createUser">
      <input class="create__input" v-model="newUserName" @change="typingMessage" placeholder="输入你的名字" autofocus required />
    </form>
  </section>
</main>
</template>

<script>
import config from '../config'
import Chatkit from '@pusher/chatkit'

import MessageItem from './components/MessageItem'

export default {
  name: 'App',
  created() {
    try {
      const users = localStorage.getItem(config.CHAT_CREATED_USERS)
      if (users) {
        this.createdUsers = JSON.parse(users)
      }
    } catch (error) {
      console.log(error)
    }
  },
  components: {
    MessageItem: MessageItem
  },
  mounted() {
    this.$Loading.config({
      color: '#999'
    })
  },
  data() {
    return {
      createdUsers: [],
      isLogging: false,
      isCreatingUser: false,
      isSendingMessage: false,
      newUserName: '',
      newMessage: '',
      errorMessage: '',
      darkTheme: false,
      currentUser: null,
      currentRoom: null,
      users: [],
      messages: [],
      hint: ''
    }
  },
  methods: {
    async chooseUser(user) {
      if (this.isLogging) {
        return
      }
      this.isLogging = true
      await this.initChatApp(user.name)
      this.isLogging = false
    },
    async createUser() {
      if (this.isCreatingUser) {
        return
      }
      this.$Loading.start()
      this.isCreatingUser = true
      const username = this.newUserName

      const result = await fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username
        })
      })
        .then(res => res.json())
        .catch(error => error)

      if (result.success) {
        const user = result.user
        this.initChatApp(user.name)
        this.isCreatingUser = false
        this.$Loading.finish()

        if (this.createdUsers.length < 5) {
          this.createdUsers.push(user)
        } else {
          this.createdUsers.shift()
          this.createdUsers.push(user)
        }
        try {
          localStorage.setItem(config.CHAT_CREATED_USERS, JSON.stringify(this.createdUsers))
        } catch (error) {
          console.log(error)
        }
      } else {
        if (result.message === 'User with given id already exists') {
          this.$Message.error('用户已存在，请重试')
        } else {
          this.$Message.error(result.message)
        }
        this.$Loading.error()
      }
    },
    async initChatApp(userId) {
      this.$Loading.start()

      const chatManager = new Chatkit.ChatManager({
        userId,
        instanceLocator: config.CHATKIT_INSTANCELOCATOR,
        tokenProvider: new Chatkit.TokenProvider({
          url: `${config.SERVER_HOST}:${config.SERVER_PORT}/auth`
        })
      })

      const currentUser = await chatManager.connect().catch(error => {
        this.$Loading.error()
        this.$Message.error(error.message)
      })

      const currentRoom = await currentUser
        .joinRoom({
          roomId: config.CHATKIT_ROOM_ID
        })
        .catch(error => {
          this.$Message.error(error.message)
          return error
        })

      currentUser.subscribeToRoom({
        messageLimit: 20,
        roomId: config.CHATKIT_ROOM_ID,
        hooks: {
          onNewMessage: message => {
            this.users = this.users.map(user => {
              if (user.name === message.senderId) {
                user.online = true
              }
              return user
            })
            this.messages.push(message)
          },
          onUserStartedTyping: user => {
            this.hint = `${user.name} is typing`
          },
          onUserStoppedTyping: user => {
            this.hint = ''
          },
          onUserCameOnline: onlineUser => {
            this.hint = `${onlineUser.name} is online`
            this.users = this.users.map(user => {
              if (user.name === onlineUser.name) {
                user.online = true
              }
              return user
            })
          },
          onUserWentOffline: offlineUser => {
            this.hint = `${offlineUser.name} is offline`
            this.users = this.users.map(user => {
              if (user.name === offlineUser.name) {
                user.online = false
              }
              return user
            })
          },
          onUserJoined: joinedUser => {
            this.hint = `${joinedUser.name} is join room`
            this.users = this.users.map(user => {
              if (user.name === joinedUser.name) {
                user.online = true
              }
              return user
            })
          },
          onUserLeft: leftUser => {
            this.hint = `${leftUser.name} is left room`
          }
        }
      })

      const messages = await currentUser
        .fetchMessages({
          roomId: config.CHATKIT_ROOM_ID,
          direction: 'older',
          limit: 20
        })
        .catch(error => {
          this.$Message.error(error.message)
        })

      this.currentUser = currentUser
      this.currentRoom = currentRoom
      this.users = currentRoom.userIds.filter(name => name !== currentUser.name).map(name => {
        return {
          name,
          online: false
        }
      })
      this.messages = messages
      this.$Loading.finish()
    },
    typingMessage() {
      this.currentUser
        .isTypingIn({
          roomId: config.CHATKIT_ROOM_ID
        })
        .then(() => {
          console.log('Success!')
        })
        .catch(err => {
          console.log(`Error sending typing indicator: ${err}`)
        })
    },
    async sendMessage() {
      if (!this.newMessage || this.isSendingMessage) {
        return
      }
      this.isSendingMessage = true
      this.currentUser
        .sendMessage({
          text: this.newMessage,
          roomId: config.CHATKIT_ROOM_ID
        })
        .then(messageId => {
          this.newMessage = ''
          this.isSendingMessage = false
        })
        .catch(error => {
          this.newMessage = ''
          this.isSendingMessage = false
          this.$Message.error(error.message)
        })
    },
    dropDownClick(name) {
      if (name === 'logout') {
        this.userLogout()
      }
    },
    userLogout() {
      this.currentUser = null
      this.currentRoom = null
      this.messages.length = 0
      this.users.length = 0
      this.hint = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  color: #333;
  background-color: #fff;
}

.app--dark {
  color: #fff;
  background-color: #333;
}

.create {
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

  &__title {
    margin-top: 180px;
    margin-bottom: 1rem;
  }

  &__users {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    max-width: 720px;
    margin-bottom: 1rem;
  }

  &__user:not(:last-of-type) {
    margin-right: 1em;
  }

  &__or {
    position: relative;
    margin-top: 1rem;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 200%;
      width: 186px;
      height: 1px;
      background-color: #eee;
      transform: translateY(-50%);
    }

    &::after {
      left: auto;
      right: 200%;
    }
  }

  &__form {
    width: 95%;
    max-width: 420px;
    margin-top: 180px;
    margin-bottom: 1rem;
  }

  &__form--top {
    margin-top: 1rem;
  }

  &__input {
    width: 100%;
    padding: 1em;
    font-size: 2rem;
    text-align: center;
    outline: none;
    border: none;
    border-bottom: 1px solid #999;
  }
}

.chat {
  display: grid;
  grid-auto-columns: 240px auto;
  grid-auto-rows: 30px 30px auto 70px;
  grid-template-areas:
    'current hint'
    'current messages'
    'users messages'
    'users send';
  height: 100vh;

  &__current {
    grid-area: current;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 1rem;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .avatar {
      color: #fff;
      margin-right: 0.4rem;
      background-color: #333;
    }

    .avatar--dark {
      color: #333;
      background-color: #fff;
    }

    .name {
      flex: 1;
      color: #666;
      font-size: 1.4rem;
    }

    .name--dark {
      color: #fff;
    }
  }

  &__current--dark {
    border-right-color: #444;
    border-bottom-color: #444;
  }

  &__users {
    grid-area: users;
    position: relative;
    min-height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid #eee;

    .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 1rem;
      font-size: 1.8rem;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        background-color: #eee;
      }

      .name {
        flex: 1;
      }

      .spot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #999;
      }

      .spot--online {
        background-color: green;
      }
    }
  }

  &__users--dark {
    border-right-color: #444;
  }

  &__hint {
    grid-area: hint;
    min-height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }

  &__hint--dark {
    border-bottom-color: #444;
  }

  &__messages {
    grid-area: messages;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    max-height: calc(100vh - 100px);
    min-height: calc(100vh - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    border-bottom: 1px solid #eee;

    .message {
      max-width: 95%;
      padding: 1rem;
      border-radius: 4px;
      list-style: none;
      margin-bottom: 1rem;
    }

    .message--self {
      align-self: flex-end;
    }

    .meta {
      opacity: 0.6;
    }

    .text {
      margin-top: 4px;
      font-size: 2rem;
      font-weight: 500;
      line-height: 1.5;
    }
  }

  &__messages--dark {
    border-bottom-color: #444;
  }

  &__send {
    grid-area: send;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .input {
      flex: 1;
      height: 100%;
      font-size: 2.4rem;
      border: none;
      outline: none;
      padding: 1em;
    }

    .input--dark {
      color: #fff;
      background-color: #333;
    }

    .button {
      width: 16rem;
      height: 100%;
      border: none;
      color: #666;
      font-size: 2rem;
      font-weight: bold;
      border-left: 1px solid #eee;
    }

    .button--dark {
      color: #fff;
      background-color: #333;
      border-left-color: #444;
    }
  }
}
</style>
