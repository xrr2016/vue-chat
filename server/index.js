const cors = require('cors')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const Chatkit = require('pusher-chatkit-server')
const config = require('../config')

const app = express()
const PORT = config.SERVER_PORT || 4399

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// eslint-disable-next-line
const chatkit = new Chatkit.default({
  instanceLocator: config.CHATKIT_INSTANCELOCATOR,
  key: config.CHATKIT_KEY
})

app.use('/', express.static(path.join(__dirname, '../dist')))

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
  const data = chatkit.authenticate({ userId: req.query.user_id })
  res.status(data.status).json(data.body)
})

app.listen(PORT, error => {
  if (error) {
    console.log(error)
  } else {
    console.log(`Server running on port ${PORT}`)
  }
})
