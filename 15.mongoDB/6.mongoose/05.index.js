require('./tools/conn_mongo');

// var Student = require('./models/student').model;
var Student = require('./models/student')
console.log(Student)

Student.find({},function (err,docs) {
    if (!err){
        console.log(docs)
    }
})
