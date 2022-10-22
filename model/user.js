var mongoose = require("mongoose")
var bcrypt = require("bcryptjs")
var Schema = mongoose.Schema;
var user = new Schema(
    {
        Fac_ID: {
            type: String,
            required: true,
            unique: true
        },
        Fac_Name: {
            type: String,
            required: true
        },
        Department: {
            type: String,
            required: true
        },
        Phone_no: {
            type: Number,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        }
    }
)

user.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(this.Password, salt)
        this.Password = hashed
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', user);

module.exports = User
