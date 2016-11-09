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
      //localStorage.setItem('userToken', data.id_token);
      res.render('user/profile', {
        email: req.body.email
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
    email: req.body.email
  })
}

module.exports = initUser