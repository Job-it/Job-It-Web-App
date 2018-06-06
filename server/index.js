var express = require('express');
var parser = require('body-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const util = require('./utilities.js');
const db = require('../db/index.js');

const contactsRouter = require('./routes/contactsRouts');
const opportunitiesRouter = require('./routes/opportunitiesRouts');
const tasksRouter = require('./routes/tasksRouts.js');
const usersRouter = require('./routes/usersRouts.js');

var passport = require('./authentication/githubAuth.js');

var app = express();

// attach middleware
app.use(util.requestLogger);
app.use('/home', express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded());
app.use(bodyParser.urlencoded({extended : false}));


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//authentication

app.get('/auth/github/callback', passport.authenticate('github'), (req, res) => (res.redirect('/home')));
app.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));

// Routes
app.use('/contacts', contactsRouter);
app.use('/opportunities', opportunitiesRouter);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

var port = process.env.PORT || 9000; 

// listen for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});