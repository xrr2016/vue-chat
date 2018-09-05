const uuid = require('uuid/v4')
const cors = require('cors')
const express = require('express')
const Chatkit = require('pusher-chatkit-server')

const app = express()
const PORT = process.env.PORT || 4399

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extends: false }))

// eslint-disable-next-line
const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCELOCATOR,
  key: process.env.CHATKIT_KEY
})

app.use('/users', (req, res) => {
  const { username } = req.body

  const user = {
    id: uuid(),
    name: username
  }

  chatkit
    .createUser(user)
    .then(() => res.status(201).json({ success: true, message: '创建用户成功', user }))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.status(409).json({ success: false, message: '用户已存在' })
      } else {
        res.status(500).json({ success: false, message: '服务端错误，请重试' })
      }
    })
})

app.post('/auth', (req, res) => {
  const data = chatkit.authenticate({ userId: req.query.userId })
  res.status(data.status).json(data.body)
})

app.listen(PORT, error => {
  if (error) {
    console.log(error)
  } else {
    console.log(`Server running on port ${PORT}`)
  }
})
