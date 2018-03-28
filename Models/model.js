const Sequelize = require('sequelize'); //import sequelize orm

// connect with psql db
var connection = new Sequelize('emd','postgres','test',{
  dialect : 'postgres'
});
//create a table;
  var student = connection.define('student',{
    name : {
      type : Sequelize.STRING,
      allowNull : false},
    email : {
      type: Sequelize.STRING,
      unique : true,
      allowNull : false},
    password : {
      type : Sequelize.STRING,
      allowNull : false },
    mobile : {
      type: Sequelize.BIGINT,
      unique : true,
      allowNull : false }
  });
  


var methods = {};
  methods.signup = function(u_name,u_email,u_password,u_mobile){
    return connection.sync().then(function(){
      return student.create({
        name : u_name,
        email : u_email,
        password : u_password,
        mobile : u_mobile
      })
    });
  }
    methods.login = function(email_id){
      return connection.sync().then(function(){
         return student.findOne({where : {email : email_id }} );
        }).then(result =>{          
            if (result != undefined && result.dataValues != undefined) {
              return Promise.resolve(result.dataValues)
            } else {
              return Promise.reject( "Not found")
            }            
        });
    }
    
exports.fun = methods;
