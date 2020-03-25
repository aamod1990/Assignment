const User = require('../models/users');
const Exercise = require('../models/exercise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// encrypt user password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}
// validate encrypted user password
const validatePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
// check user is valid for task
const isAuthenticated = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
            return res.status(401).json({
                error: "You need to be logged in to access this route"
            });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
//user signup
const signup = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exist" });
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword });
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            message: "You have signed up successfully"
        })
    } catch (error) {
        next(error)
    }
}
//user login and return exercise
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Email does not exist" });
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Password is not correct" });
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email },
            accessToken
        })
    } catch (error) {
        next(error);
    }
}
// export function for other module
module.exports = {
    signup: signup,
    login: login,
    hashPassword: hashPassword,
    validatePassword: validatePassword,
    isAuthenticated: isAuthenticated
};