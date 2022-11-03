var express = require('express');
var router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post("/Register", async (req, res) => {

  const { Fac_ID, Fac_Name, Department, Phone_no, Email, Password, courses } = req.body
  if (!Fac_ID || !Fac_Name || !Department || !Phone_no || !Email || !Password || !courses) {
    res.status(400).json({
      Error: "Please Fill Data"
    })

  }
  try {
    const Exist = await User.findOne({ Email: Email });
    const ID = await User.findOne({ Fac_ID: Fac_ID });
    if (Exist || ID) {
      return res.status(422).json({ Error: "Email or ID already exist" });
    }
    if (Password.match(/[a-z]/g) && Password.match(/[A-Z]/g) && Password.match(/[0-9]/g)) {

      const user = new User({ Fac_ID, Fac_Name, Department, courses, Email, Phone_no, Password })
      await user.save()

      res.json({ message: "user registerd successfully" })
    }

    else {
      res.status(401).json({
        error: "password is not strong"
      })
    }

  } catch (error) {
    console.log(error);
  }

})

router.post("/Login", async (req, res) => {

  try {
    const { Fac_ID, Email, Password } = req.body;

    if (!Fac_ID || !Email || !Password) {
      return res.status(400).json({
        Error: "Please fill data",
      });
    }
    const userlogin = await User.findOne({ Email: Email });
    if (userlogin) {

      const match = await bcrypt.compare(Password, userlogin.Password);
      const MatchId = await User.findOne({ Fac_ID: Fac_ID, Email: Email })
      console.log(MatchId);
      if (!match || !MatchId) {
        res.status(400).json({
          Error: "Invalid credentials",
        });
      } else {  

        res.json({
          message: "User Signin Successfully",
          userlogin
        });
      }
    } else {
      res.status(400).json({
        Error: "Invalid credentials Id or Email",
      });
    }
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
