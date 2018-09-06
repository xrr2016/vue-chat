// const uuid = require('uuid/v4')
const cors = require('cors')
const express = require('express')
const Chatkit = require('pusher-chatkit-server')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4399

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// eslint-disable-next-line
const chatkit = new Chatkit.default({
  instanceLocator: process.env.CHATKIT_INSTANCELOCATOR,
  key: process.env.CHATKIT_KEY
})

app.post('/user', (req, res) => {
  const { username } = req.body

  const user = {
    id: username,
    name: username
  }

  chatkit
    .createUser(user)
    .then(() => res.status(201).json({ success: true, message: '创建用户成功', user }))
    .catch(error => {
      res.status(error.status).json({ success: false, message: error.error_description })
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
