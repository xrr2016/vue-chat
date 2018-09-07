const Chatkit = require('@pusher/chatkit')
const config = require('../../config')

function createUser(username) {
  return fetch(`${config.SERVER_HOST}:${config.SERVER_PORT}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })
    .then(res => res.json())
    .then(json => json.user)
    .catch(error => error)
}

async function initUser(userId) {
  const chatManager = new Chatkit.ChatManager({
    userId,
    instanceLocator: config.CHATKIT_INSTANCELOCATOR,
    tokenProvider: new Chatkit.TokenProvider({
      url: `${config.SERVER_HOST}:${config.SERVER_PORT}/auth`
    })
  })

  return chatManager
    .connect()
    .then(user => user)
    .catch(error => error)
}

export default {
  createUser,
  initUser
}
