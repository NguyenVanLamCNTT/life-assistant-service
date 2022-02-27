const {Users} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const createUser = async (req, res) => {
    try {
        const {full_name, gender, age, email, password} = req.body;
        const user_email = await Users.findOne({email: email});
        if (user_email){
            return res.status(400).json({success: false, message: "email exists"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = new Users({
            full_name: full_name,
            gender: gender,
            age: Number(age),
            role: "customer",
            avatar_id: 1,
            email: email,
            password: hashPassword
        });
        await user.save();
        return res.status(200).json({success: true});
    }catch (err) {
        return  res.status(400).json(err);
    }
}
const isAuthenticated = async (req, res, next) => {
    try {
        const access_token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(access_token,config.AUTH_TOKEN_SECRET.ACCESS_TOKEN);
        if (!user) {
            return res.status(401).json({success: false, message: "user not exists"});
        }
        req.user = user;
        return next();
    }catch (err) {
        return res.status(401).json(err);
    }
}
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({success: false, message: 'Incorrect login details'});
        }
        const user = await Users.findOne({email: email});
        if (!user){
            return res.status(400).json({success: false, message: "user not exists"});
        }
        let isCorrectPass = await bcrypt.compare(password, user.password);
        if (!isCorrectPass){
            return res.status(400).json({message: 'Incorrect password'});
        }
        const accessToken = signToken(user._id, 'access_token');
        const refreshToken = signToken(user._id, 'refresh_token');
        return res.status(200).json({accessToken: accessToken,refreshToken: refreshToken});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const refreshToken = async (req, res) => {
    try {
        const {refresh_token}  = req.body;
        const user = jwt.verify(refresh_token,config.AUTH_TOKEN_SECRET.REFRESH_TOKEN);
        const accessToken = signToken(user.id,"access_token");
        return res.status(200).json({accessToken: accessToken});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const signToken = (user_id,type_token) => {
    let secret = "";
    let life = "";
    if (type_token === "access_token"){
       secret = config.AUTH_TOKEN_SECRET.ACCESS_TOKEN;
        life = config.LIFE_TIME_TOKEN.ACCESS_TOKEN;
    }else {
        secret = config.AUTH_TOKEN_SECRET.REFRESH_TOKEN;
        life = config.LIFE_TIME_TOKEN.REFRESH_TOKEN;
    }
    return jwt.sign(
        {
            id: user_id,
        },
        secret,
        {
            expiresIn: life
        }
    );
}
module.exports = {
    createUser,
    loginUser,
    refreshToken,
    isAuthenticated
}
