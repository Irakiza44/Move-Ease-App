const mongoose = require('mongoose')
const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    email: {
        type: String,
        required: [true, "please add the contact mail address"],
    },
    name: {
        type: String,
        required: [true, "please add the contact name"],
    },
    natinalId: {
        type: String,
        required: [true, "please add the National Id"],
    },
    cellname: {
        type: String,
        required: [true, "please add the Cell Name"],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("contact", contactSchema)