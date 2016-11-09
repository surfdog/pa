const rp = require('request-promise')

function initUser (app) {
  app.get('/', renderWelcome)
  app.get('/profile', renderProfile)
  app.post('/login', (req, res) => {  
  rp({
    method: 'POST',
    uri: 'http://54.153.108.164/api/v1/tokens',
    body: {
      email: req.body.email,
      password: req.body.password
    },
    json: true
    })
    .then((data) => {
      res.render('user/profile', {
        email: data.id_token
      })
    })
    .catch((err) => {
      console.log(err)
      res.render('user/welcome')
    })
  })
}

function renderWelcome (req, res) {
  res.render('user/welcome')
}

function renderProfile (req, res) {
  res.render('user/profile', {
    email: req.user.email
  })
}

module.exports = initUser