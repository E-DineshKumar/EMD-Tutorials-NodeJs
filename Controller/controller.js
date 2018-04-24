var model = require('./../Models/model.js')

var methods = {}

methods.login = function (email, password) {
  return model.fun.login(email).then(function (result) {
    if (password === result.password) {
      return Promise.resolve({
        "username":result.name,"message": "loggedin"
      });
    } else {
      return Promise.reject({
        "username":result.name,"message": "failure"
      });
    }
  })
    .catch(error => {
      console.log("Login Error");
      return Promise.reject({
        "message": "failure"
      });
    })

}

methods.signup = function (name, email, password, mobile) { 
  
  return model.fun.signup(name, email, password, mobile).then(result =>{
    return Promise.resolve({
      "message" : "signedup"
    });
  })
  .catch(error =>{
    console.log(error);    
    return Promise.reject({
      "message" : "failure"
    });
  })
}

methods.addCourseData = function (courseID, courseName, topicName, data) { 
  
  return model.fun.addCourseData(courseID, courseName, topicName, data).then(result =>{
    return Promise.resolve({
      "message" : "succesfuly added"
    });
  })
  .catch(error =>{
    console.log(error);    
    return Promise.reject({
      "message" : "failure"
    });
  })
}

methods.addCourse = function (courseID, courseName, imageUrl) { 
  
  return model.fun.addCourse(courseID, courseName,imageUrl).then(result =>{
    return Promise.resolve({
      "message" : "course successfully added"
    });
  })
  .catch(error =>{
    console.log(error);    
    return Promise.reject({
      "message" : "failure"
    });
  })
}

methods.addCourseData = function (courseID, courseName, topicName, courseData) { 
  return model.fun.addCourseData(courseID, courseName,topicName, courseData).then(result =>{
    return Promise.resolve({
      "message" : "course data successfully added"
    });
  })
  .catch(error =>{
    console.log(error);    
    return Promise.reject({
      "message" : "failure"
    });
  })
}
methods.getCourse = function(){
  return model.fun.getCourse().then(result =>{
    return Promise.resolve(result)
  })
  .catch(error =>{
    return Promise.reject({
      "message":"no courses found"
    })
  })
}
exports.cont = methods;