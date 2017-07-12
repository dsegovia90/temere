const express = require('express');

const app = express();
require('dotenv').load();

const session = require('express-session');

const routes = require('./app/routes/routes.js');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'pug');
app.set('views', './app/views');
app.use(express.static('./public'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(require('flash')());

routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Node.js listening on port 3000...');
});
