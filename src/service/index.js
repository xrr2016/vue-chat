function createUser(username) {
  return fetch(`http://localhost:3699/user`, {
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

export default {
  createUser
}
