const express = require('express')
const app = express()
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
  saveUninitialized: false,
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
    res.redirect('/');;
  } else {
    next();
  }
};
// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
  console.log(req.cookies.user_sid)
  res.send("Welcome to my site")
});


app.post('/login', function (req, res) {
  console.log("session", req.session);
  if (req.session.user && req.cookies.user_sid) {
    result = { "message": "loggedin" };
    res.send(result);
  } else {
    var data = req.body;
    var responseData = {};
    res.setHeader('Content-Type', 'application/json');
    controller.cont.login(data.email, data.password).then(result => {
      req.session.user = result;
      res.send(result);
    }
    ).catch(result => res.send(result))
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
  ).catch(result => res.send(result))
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
.post(function(req, res){
  var data = req.body;
  console.log(data);
  if (req.session.user && req.cookies.user_sid) {
    controller.cont.updateSection(data.courseName,data.topicName,data.courseData,data.video).then(result => {
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
app.listen(3000, '0.0.0.0', function () {
  console.log('Tutorial app listening on port 3000!')
})
