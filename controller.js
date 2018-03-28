var model = require('./model.js')

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
exports.cont = methods
