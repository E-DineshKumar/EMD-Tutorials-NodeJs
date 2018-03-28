const express = require('express')
const app = express()
var controller = require('./controller.js')
var model = require('./model.js')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MemoryStore =session.MemoryStore;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: '1234567890QWERTY',
  resave: true,
  store: new MemoryStore(),
  saveUninitialized: true,
  cookie: {
      expires: 600000
  }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/');
  } else {
      next();
  }    
};
// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
  res.send("welcome to site");
});



app.get('/home', function (req, res) {
  result = {"message" : "home"}
  res.send(result)
})

app.post('/login', function (req, res) {
  console.log(req.session.user)
  if (req.session.user && req.cookies.user_sid) {
    result = {"message":"loggedinwithsession"};
    res.send(req.session.user);
} else {
  var data = req.body;
  var responseData = {};
  console.log(data);  
  res.setHeader('Content-Type', 'application/json');
   controller.cont.login(data.email, data.password).then( result =>{
    res.send(result),
    req.session.user = result;
   }
  ).catch(result => res.send(result))
}
})

app.get('/home',function(req,res){
  res.send('welcome');
})

app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      result = {"message":"logout"};
      res.send(result);
  } else {
    result = {"message":"logout"};
    res.send(result);
  }
});

app.post('/signup',function (req, res) {
  var data = req.body;
  console.log(data);
  res.setHeader('Content-Type', 'application/json');
  controller.cont.signup(data.name, data.email, data.password, data.mobile).then( result =>
    res.send(result)
  ).catch(result => res.send(result))
})


app.route('/php')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
app.listen(3000,'0.0.0.0', function () {
  console.log('Example app listening on port 3000!')

})
