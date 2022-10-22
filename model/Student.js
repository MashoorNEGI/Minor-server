var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var student = new Schema(
    {
        Fac_ID: {
            type: String,
            required: true
        },
        Sname: {
            type: String,
            required: true
        },
        Enroll_no: {
            type: String,
            required: true
        },
        Course: {
            type: String,
            required: true
        },
        Attendance: {
            type: String,

        }
    }
)
const Student = mongoose.model('Student', student);

module.exports = Student
