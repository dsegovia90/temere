var express = require('express')
var app = express()
require('dotenv').load()

var session = require('express-session')

var routes = require('./app/routes/routes.js')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(process.env.MONGO_URI)

app.set('view engine', 'pug')
app.set('views', './app/views')
app.use(express.static('./public'))

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}))

app.use(require('flash')())

routes(app)

var port = process.env.PORT || 3000
app.listen(port, function(){
	console.log('Node.js listening on port 3000...')
})