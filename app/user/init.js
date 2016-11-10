const rp = require('request-promise')
const storage = require('node-persist')

const config = require('../../config/auth_server');

function initUser (app) {
  storage.initSync();
  app.get('/', renderWelcome)
  app.get('/profile', renderProfile)
  app.post('/login', (req, res) => {  
    rp({
      method: 'POST',
      uri: config.ith_auth_server_login_url,
      body: {
        email: req.body.email,
        password: req.body.password
      },
      json: true
      })
      .then((data) => {
        storage.setItem('userToken', data.id_token)
        renderProfile(req, res)
      })
      .catch((err) => {
        console.log(err)
        renderWelcome(req, res)
      })
  })
}

function renderWelcome (req, res) {
  res.render('user/welcome')
}

function renderProfile (req, res) {
  res.render('user/profile', {
    email: req.body.email,
    id_token: storage.getItem('userToken')
  })
}

module.exports = initUser