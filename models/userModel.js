const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "please add user email"],
        unique: [true, "Eamil address already taken"],
    },
    password: {
        type: String,
        required: [true, "please add user password"],
    },
    reEnteredPassword: {
        type: String,
        required: [true, "Please re-enter the password"],
    },
    role: {
        type: String,
        default: "user" // Default role
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);