const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Attendance", { useNewUrlParser: true }, function () {
    console.log("Database connected")
})