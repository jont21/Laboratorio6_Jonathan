const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const app = express();
const User = require('./models/user'); 
const middleware = require('./middleware');
const service = require('./service');

// Connection to DB and configurations
 mongoose.connect('mongodb://localhost/token', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
 });
 app.set('superSecret', config.secret); // secret variable

// Middlewares
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(methodOverride());

 // =======================
 // routes ================
 // =======================
 app.get('/', function(req, res) {
 res.send('Hola! API: http://localhost:3000/api');
 });

// Start server
 app.listen(3000, function() {
 console.log("Node server running on http://localhost:3000");
 });
 app.get('/setup', function(req, res) {
    // create a sample user
    var nick = new User({ 
    name: 'Rodrigo', 
    password: 'pro',
    admin: true 
    });
   
   // save the sample user
    nick.save(function(err) {
    if (err) throw err;
   
   console.log('User saved successfully');
    res.json({ success: true });
    });
   });
   // API ROUTES -------------------
var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
 res.json({ message: 'Bienvenido al api de programacion.com.py :)' });
});

apiRoutes.get('/users', function(req, res) {
 User.find({}, function(err, users) {
 res.json(users);
 });
});

app.use('/api', apiRoutes);

// Route to authenticate a user (POST http://localhost:3000/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
    //find the user
    User.findOne({
    name: req.body.name
    }, function(err, user) {
   
   if (err) throw err;
   
   if (!user) {
    res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
   
   // check if password matches
    if (user.password != req.body.password) {
    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    } else {
    // return the information including token as JSON
    res.json({
    success: true,
    message: 'Enjoy your token!',
    token: service.createToken(user)
    });
    }
    }
    });
   });