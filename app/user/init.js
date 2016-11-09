const rp = require('request-promise')

function initUser (app) {
  app.get('/', renderWelcome)
  app.get('/profile', renderProfile)
  app.post('/login', (req, res) => {  
  rp({
    uri: 'http://54.153.108.164/api/v1/tokens',
    body: {
      email: 'surfdog86@gmail.com',
      password: 'hang10'},
    json: true
    })
    .then((data) => {
      renderProfile
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
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