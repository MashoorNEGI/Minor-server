var express = require('express');
var router = express.Router();
const student = require('../model/Student');
const User = require('../model/user')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* ADD Student. */

router.post("/addstudent", async (req, res) => {
  const { Fac_ID, Sname, Enroll_no, Course, Attendance } = req.body
  if (!Fac_ID || !Sname || !Enroll_no || !Course || !Attendance) {
    return res.status(400).json({
      Error: "Please Fill Data"
    })
  }
  try {
    const Student = await student.findOne({ Enroll_no: Enroll_no })
    if (!Student) {
      const S_Details = new student({ Fac_ID, Sname, Enroll_no, Course, Attendance })
      await S_Details.save()
      res.json({
        message: "data entered"
      })
    } else {
      res.status(401).json({
        Error: "student already exist"
      })

    }


  } catch (error) {
    console.log(error);
  }
})

/* GET Student. */

router.post("/getstudent", async (req, res) => {
  const { Fac_ID, courses } = req.body
  if (!Fac_ID || !courses) {
    res.status(422).json({
      Error: "Faculty ID or courses Required !"
    })
  } else {
    student.find({ Course: courses, Fac_ID: Fac_ID }, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          found
        })

      }
    })
  }
})

router.post("/update", async (req, res) => {
  const { Attendance, Enroll_no } = req.body
  if (!Attendance || !Enroll_no) {
    res.status(422).json({
      Error: "Field Required !"
    })
  } else {
    student.updateOne({ Enroll_no: Enroll_no }, { Attendance: Attendance }, async (error, found) => {
      if (!error) {
        res.json({
          message: "updated to " + Attendance
        })
      } else {
        console.log(error);
      }
    })
  }
})

router.post("/addcourses", (req, res) => {
  const { courses, Fac_ID } = req.body
  if (!courses || !Fac_ID) {
    res.status(422).json({
      Error: "Field Required !"
    })
  } else {
    User.updateOne({ Fac_ID: Fac_ID }, {
      $push: {
        courses: courses
      }
    }, (error, found) => {
      if (!error) {

        res.json({
          message: "course updated"
        })
      } else {
        console.log(error);
      }
    })
  }
})
router.post("/reset", async (req, res) => {
  const { Course, Attendance } = req.body
  if (!Course || !Attendance) {
    res.status(422).json({
      Error: "Field Required"
    })
  } else {
    student.updateMany({ Course: Course }, { Attendance: Attendance }, (err, found) => {
      if (!err) {
        res.json({
          message: "Reset Successfully"
        })
      }
    })
  }
})
module.exports = router;
