var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var contact = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Message: {
            type: String,
            required: true
        }
    }
)
const Contact = mongoose.model('Contact', contact);

module.exports = Contact
