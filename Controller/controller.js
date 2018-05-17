var model = require('./../Models/model.js')
const fs = require('fs');


var methods = {}

methods.login = function (email, password) {
  return model.fun.login(email).then(function (result) {
    if (password === result.password) {
      return Promise.resolve({
        "username": result.name, "message": "loggedin"
      });
    } else {
      return Promise.reject({
        "username": result.name, "message": "Password incorrect"
      });
    }
  })
    .catch(error => {
      return Promise.reject({
        "message": "Verify email/password"
      });
    })

}

methods.signup = function (name, email, password, mobile) {

  return model.fun.signup(name, email, password, mobile).then(result => {
    return Promise.resolve({
      "message": "signedup"
    });
  })
    .catch(error => {
      console.log(error);
      return Promise.reject({
        "message": "Already signed up"
      });
    })
}

methods.addCourse = function (courseID, courseName, imageUrl) {

  return model.fun.addCourse(courseID, courseName, imageUrl).then(result => {
    return Promise.resolve({
      "message": "course successfully added"
    });
  })
    .catch(error => {
      console.log(error);
      return Promise.reject({
        "message": "failure"
      });
    })
}

methods.addCourseData = function (courseID, courseName, topicName, courseData, videolink) {
  return model.fun.checkCourse(courseName).then(flag => {
    console.log(flag);
    if (courseID == flag.courseid) {
      return model.fun.addCourseData(courseID, topicName, courseData, videolink).then(result => {
        return Promise.resolve({
          "message": "course data successfully added"
        });
      })
        .catch(error => {
          console.log(error);
          return Promise.reject({
            "message": "failure"
          });
        })
    } else {
      return Promise.reject({ "message": "course not found" })
    }
  })
    .catch(error => {
      return Promise.reject({ "message": "course not found" })
    })
}

methods.getCourse = function () {
  return model.fun.getCourse().then(result => {
    return Promise.resolve(result)
  })
    .catch(error => {
      return Promise.reject({
        "message": "no courses found"
      })
    })
}
methods.getCourseData = function (courseName) {
  return model.fun.checkCourse(courseName).then(flag => {
    return model.fun.getCourseData(flag.courseid).then(result => {
      var data = {};
      var count = 0;
      for (let val of result) {
        data[count] = val.section;
        count = count + 1;
      }
      return Promise.resolve(data);
    })
  })
    .catch(error => {
      return Promise.reject({ "message": "course not found" })
    })
}
methods.getSectionData = function (courseName, section) {
  return model.fun.checkCourse(courseName).then(flag => {
    return model.fun.getSectionData(flag.courseid, section).then(result => {
      console.log("SECTION RESULT", result);

      return Promise.resolve({ "data": result.data, "link": result.videoLink });
    })
      .catch(error => {
        return Promise.reject({ "message": "error in section data" })
      })
  })
    .catch(error => {
      return Promise.reject({ "message": "cannot find the course" })
    })
}
methods.deleteCourse = function (courseName) {
  return model.fun.checkCourse(courseName).then(flag => {
    return model.fun.deleteCourse(flag.courseid).then(result => {
      fs.unlink(flag.imageurl, (err) => {
        if (err) return Promise.resolve({ "message": "error in file deleting" });
        console.log("Successfully file deleted");
      })
      return Promise.resolve({ "message": "successfully deleted" })
    })
      .catch(error => {
        return Promise.reject({ "message": "error in delete course" })
      })
  })
    .catch(error => {
      return Promise.reject({ "message": "cannot find the course" })
    })
}
methods.updateSection = function (courseName, topicName, courseData,videolink) {
  return model.fun.checkCourse(courseName).then(flag => {
    console.log(flag);
    return model.fun.updateCourseData(flag.courseid, topicName, courseData, videolink).then(result => {
      return Promise.resolve({
        "message": "course data successfully updated"
      });
    })
      .catch(error => {
        console.log(error);
        return Promise.reject({
          "message": "failure"
        });
      })

  })
    .catch(error => {
      return Promise.reject({ "message": "course not found" })
    })
}
exports.cont = methods;
