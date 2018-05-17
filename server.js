const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var controller = require('./Controller/controller')
var model = require('./Models/model.js')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer')
var path = require("path");
var uuid = require("uuid");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {

    cb(null, uuid.v4() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/uploads', express.static(__dirname + '/uploads'));




app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: true,
  saveUninitialized: false
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
    res.send(req.session.user)
  } else {
    res.statusCode = 401;
    res.send({ "message": "not logged in" })
  }
};
// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
  console.log("hello")
  //res.send("Welcome to my site")
});

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

var numUsers = 0;
var chatrooms = [];
model.fun.getCourse().then(result => {
  for (let val in result) {
    
    chatrooms.push({"coursename":result[val].coursename,"numUsers":0});
  }
  console.log(chatrooms);
  
  for (let i of chatrooms) {
    var room = io.of('/' + (i.coursename).replace(/ /g, "-"));
    room.on('connection', (socket) => {
      var addedUser = false;
      console.log("user connected");

      // when the client emits 'new message', this listens and executes
      socket.on('new message', (data) => {
        console.log(data);
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
          username: socket.username,
          message: data
        });
      });

      // when the client emits 'add user', this listens and executes
      socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++i.numUsers;
        addedUser = true;
        socket.emit('login', {
          numUsers: i.numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          username: socket.username,
          numUsers: i.numUsers
        });
      });

      // when the client emits 'typing', we broadcast it to others
      socket.on('typing', () => {
        socket.broadcast.emit('typing', {
          username: socket.username
        });
      });

      // when the client emits 'stop typing', we broadcast it to others
      socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
          username: socket.username
        });
      });

      // when the user disconnects.. perform this
      socket.on('disconnect', () => {
        if (addedUser) {
          --i.numUsers;

          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            username: socket.username,
            numUsers: i.numUsers
          });
        }
      });
      socket.on('event1', (data) => {
        console.log(data.msg);
      });

      socket.emit('event2', {
        msg: 'Server to client, do you read me? Over.'
      });

      socket.on('event3', (data) => {
        console.log(data.msg);
        socket.emit('event4', {
          msg: 'Loud and clear :)'
        });
      });
    });
  }

})


app.post('/login', function (req, res) {
  console.log("session", req.session);
  if (req.session.user && req.cookies.user_sid) {
    res.send(req.session.user);
  } else {
    var data = req.body;
    var responseData = {};
    res.setHeader('Content-Type', 'application/json');
    controller.cont.login(data.email, data.password).then(result => {
      req.session.user = result;
      res.send(result);
    }
    ).catch(result => {
      res.statusCode = 401
      res.send(result)
    })
  }
})
app.route('/home')
  .get(function (req, res) {
    console.log("session profile", req.session);
    if (req.session.user && req.cookies.user_sid) {
      controller.cont.getCourse().then(result => {
        res.send(result);
      })
        .catch(error => {
          res.send(error);
        })

    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })

app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    result = { "message": "logout" };
    res.send(result);
  } else {
    res.statusCode = 401;
    result = { "message": "login" };
    res.send(result);
  }
});


app.post('/signup', function (req, res) {
  var data = req.body;
  console.log(data);
  res.setHeader('Content-Type', 'application/json');
  controller.cont.signup(data.name, data.email, data.password, data.mobile).then(result =>
    res.send(result)
  ).catch(result => {
    res.statusCode = 401;
    res.send(result)
  })
})


app.route('/createNew')
  .post(upload.single('pic'), function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      var data = req.body;

      res.setHeader('Content-Type', 'application/json');
      console.log(data);
      controller.cont.addCourse(data.courseId, data.courseName, req.file.path).then(result => {
        res.send(result);
      }
      ).catch(result => res.send(result))

    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })
app.route('/addCourseData')
  .post(function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      var data = req.body;
      var responseData = {};
      res.setHeader('Content-Type', 'application/json');
      controller.cont.addCourseData(data.courseId, data.courseName, data.topicName, data.courseData, data.video).then(result => {
        res.send(result);
      }
      ).catch(result => res.send(result))
    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })
app.route('/viewCourse')
  .post(function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      controller.cont.getCourse().then(result => {
        res.send(result);
      })
        .catch(error => {
          res.send(error);
        })
    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })
app.route('/course/:coursename')
  .post(function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      controller.cont.getCourseData(req.params.coursename).then(result => {
        res.send(result);
      })
        .catch(error => {
          res.send(error);
        })
    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })
app.route('/course/:coursename/:section')
  .post(function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      controller.cont.getSectionData(req.params.coursename, req.params.section).then(result => {
        res.send(result);
      })
        .catch(error => {
          res.send(error);
        })
    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })
app.route('/deleteCourse')
  .post(function (req, res) {
    var data = req.body;
    if (req.session.user && req.cookies.user_sid) {
      controller.cont.deleteCourse(data.coursename).then(result => {
        res.send(result);
      })
        .catch(error => {
          res.send(error)
        })
    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })
app.route('/update-section')
  .post(function (req, res) {
    var data = req.body;
    console.log(data);
    if (req.session.user && req.cookies.user_sid) {
      controller.cont.updateSection(data.courseName, data.topicName, data.courseData, data.video).then(result => {
        res.send(result);
      })
        .catch(error => {
          res.send(error)
        })
    } else {
      res.statusCode = 401
      result = { "message": "not logged in" };
      res.send(result);
    }
  })
http.listen(3000, '0.0.0.0', function () {
  console.log('Tutorial app listening on port 3000!')
})
