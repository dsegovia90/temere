var express = require('express')
var app = express()
require('dotenv').load()

var routes = require('./app/routes/routes.js')

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



routes(app)

var port = process.env.PORT || 3000
app.listen(port, function(){
	console.log('Node.js listening on port 3000...')
})