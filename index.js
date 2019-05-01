const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const age = parseInt(req.body.age, 10)
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  }

  return res.redirect(`/minor?age=${age}`)
})

const checkAge = (req, res, next) => {
  const age = req.query.age
  if (!age || isNaN(age)) {
    return res.redirect('/')
  }

  next()
}

app.get('/minor', checkAge, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.get('/major', checkAge, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.listen(3000)
