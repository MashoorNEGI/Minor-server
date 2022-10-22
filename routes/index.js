var express = require('express');
var router = express.Router();
const student = require('../model/Student');

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

router.get("/getstudent", async (req, res) => {
  const Fac_ID = req.body.Fac_ID
  if (!Fac_ID) {
    res.status(422).json({
      Error: "Faculty ID Required !"
    })
  } else {
    student.find({ Fac_ID: Fac_ID }, (err, found) => {
      if (!err) {
        res.json(found)
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
          message: "updated to "+ Attendance
        })
      } else {
        console.log(error);
      }
    })
  }
})

module.exports = router;
