const models = require('../models');
const db = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const {name , email, password} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const findEmail = await models.User.findOne({where: {email}});
        if(findEmail === null){
            const user = await models.User.create({name, email, password: hashPassword});
             res.status(200).json({message: "User registered successfully"});
        } else {
            return res.status(400).json({message: "Email already exists"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await models.User.findOne({where: {email}});
        if(user === null){
            return  res.status(400).json({message: "Invalid email or password"});
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT);
                return res.status(200).json({access_token: token});
            } else {
                return res.status(400).json({message: "Invalid email or password"});
            }
        }
    } catch (error) {
        res.status(500).json(error);    
    }   
};

exports.getProfile = async (req, res) => {
    try {
        const user = await models.User.findOne({where: {id: req.currentUser.id}, attributes: {exclude: ['password']}});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};