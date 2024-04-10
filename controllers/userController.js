const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');


//@ desc Register a user
//@route POST/api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        reEnteredPassword
    } = req.body;
    if (!email || !password || !reEnteredPassword) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    if (password !== reEnteredPassword) {
        res.status(400);
        throw new Error("Password mismatch");
    }
    const userAvailable = await User.findOne({
        email
    });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
        email,
        password: hashedPassword,
        reEnteredPassword: hashedPassword,
        role: "user"
    });

    // Send registration email
    sendRegistrationEmail(user);

    res.status(201).json({
        _id: user.id,
        email: user.email
    });
});

const sendRegistrationEmail = (user) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moveeaseapp@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'moveeaseapp@gmail.com',
        to: user.email,
        subject: 'Account Created Successful',
        text: `Hello ${user.email},\n\nThank you for Creating Account on Move Ease App!`
    };

    transporter.sendMail(mailOptions, (error, info) => {

    });
};


//@ desc login of a user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("all field are mandatory")
    }
    const user = await User.findOne({
        email
    })
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
                user: {
                    userName: user.userName,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECERT, {
                expiresIn: "15m"
            }
        )
        res.status(200).json({
            accessToken
        })
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
});

//@ desc loggedin user
//@route POST/api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {
    registerUser,
    loginUser,
    currentUser
};