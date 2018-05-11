const Sequelize = require('sequelize'); //import sequelize orm
const Op = Sequelize.Op;
// connect with psql db
var connection = new Sequelize('emd', 'postgres', 'test', {
  dialect: 'postgres'
});
//create a table;
var student = connection.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mobile: {
    type: Sequelize.BIGINT,
    unique: true,
    allowNull: false
  }
});
var admin = connection.define('admin', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  designation: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var courses = connection.define('course', {
  courseid: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  coursename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageurl: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
var courseData = connection.define('courseData', {
  courseid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  section: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  videoLink : {
    type: Sequelize.STRING
  }
})


var methods = {};
methods.addCourseData = function (course_id,topic_name, course_data,videolink) {
  return connection.sync().then(function () {
    return courseData.create({
      courseid: course_id,
      section: topic_name,
      data: course_data,
      videoLink : videolink
    })
  })
}
methods.addCourse = function (course_id, course_name, imageUrl) {

  return connection.sync().then(function () {
    return courses.create({
      courseid: course_id,
      coursename: course_name,
      imageurl: imageUrl
    })
  })
}
methods.signup = function (u_name, u_email, u_password, u_mobile) {
  return connection.sync().then(function () {
    return student.create({
      name: u_name,
      email: u_email,
      password: u_password,
      mobile: u_mobile
    })
  });
}
methods.login = function (email_id) {
  return connection.sync().then(function () {
    if (email_id === "admin@admin.com") {
      return admin.findOne({ where: { email: email_id } });
    } else {
      return student.findOne({ where: { email: email_id } });
    }
  }).then(result => {
    if (result != undefined && result.dataValues != undefined) {
      return Promise.resolve(result.dataValues)
    } else {
      return Promise.reject("Not found")
    }
  });
}
methods.getCourse = function () {
  return connection.sync().then(function () {
    return courses.findAll({where: {coursename: {[Op.ne]: null}}});
  }).then(result => {
    if (result != undefined) {
      var data = {};
      var count = 0;
      for (let val of result){
        data[count] = {"coursename":val.coursename,"path":val.imageurl};
        count = count + 1;
      }
      return Promise.resolve(data)
    } else {
      return Promise.reject("Not found");
    }
  })
  .catch(error => {
    console.log("model error",error);
    return Promise.reject("Not found");
  })
}
methods.getCourseData = function(course_id){
  return connection.sync().then(function(){
    return courseData.findAll({where:{courseid:course_id}})
  }).then(result =>{
    if(result != undefined){
      return Promise.resolve(result)
    }else{
      return Promise.reject({"message":"course data is null"})
    }
  })
  .catch(error =>{
    return Promise.reject({"message":"error in course dara"})
  })
}
methods.checkCourse = function(course_name){
  
  return connection.sync().then(function(){
    return courses.findOne({where:{ coursename: course_name }})
  }).then(result => {
    console.log(result)
    if(result != undefined && result.dataValues!=undefined){
      return Promise.resolve(result.dataValues);
    }else{
      return Promise.reject("not found");
    }
  }).catch(error => {
    return Promise.reject("not found");
  })
}
methods.getSectionData = function(course_id,section){
  return connection.sync().then(function(){
    return courseData.findOne({where:{[Op.and]: [{courseid: course_id}, {section: section}]}})
  }).then(result =>{
    if(result != undefined){
      return Promise.resolve(result)
    }
  })
  .catch(error =>{
    return Promise.reject({"message":"not found"})
  })
}
methods.deleteCourse = function(course_id){
  return connection.sync().then(function(){
    return courses.destroy({where:{courseid:course_id}}).then(result =>{      
      return courseData.destroy({where:{courseid:course_id}})
    })
  }).then(result =>{
     return Promise.resolve(result)
  })
  .catch(error =>{
    return Promise.reject(error)
  })
}
methods.updateCourseData = function (course_id,topic_name, course_data,videolink) {
  return connection.sync().then(function () {
    return courseData.update({
      data: course_data,
      videoLink : videolink
    },
    {where:{[Op.and]: [{courseid: course_id}, {section: topic_name}]}}
  )
  })
}
exports.fun = methods;
