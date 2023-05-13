const UserAuth = require("../models/UserAuthModel")
const UserDataModel = require('../models/UserDataModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

var privateKey = process.env.JWT_PVTKEY;
var RegToken1 = process.env.REGTOKEN1
var RegToken2 = process.env.REGTOKEN2

const register = async(req,res,next)=>{
    const {name,email,password,phone,rgToken} = req.body;
    let user
    try {
        user= await UserAuth.findOne({email:email})
        if(user){
            return res.status(500).json({message:"User already registered"})
        }
        let role =0
        if(rgToken === RegToken1 ){
            role = 1
        }else if(rgToken === RegToken2){
            role = 2
        }
        user = new UserAuth({
            name:name,
            email:email,
            phone:phone,
            password:password,
            role:role
        });
        await user.save()
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Unable to add"})
    }
    if(!user){
        return res.status(500).json({message:"Unable to add"})
    }
    if(user){
        const token = jwt.sign({user}, privateKey)    
        console.log(token);
        return res.status(200).json({tokenid: token})
    }
}


const login = async(req,res,next)=>{
    
    let user
    try {
        user = await UserAuth.findOne({
            email: req.body.email,
            password: req.body.password
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Login failed",message:"error"})
    }
    if(!user){
        return res.status(500).json({status:"Login failed",message:"User not found"})
    }
    const token = jwt.sign({user}, privateKey)  
    return res.status(200).json({status:"Login Successful",tokenid: token})
}

const getAllPatients = async (req,res)=>{
    let users
    
    try {
        const users = await UserAuth.find({role:0, user : { $exists : true }}).populate("user")
        // console.log(users);
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}


const getUnregPatients = async (req,res)=>{
    let users
    
    try {
        const users = await UserAuth.find({ user : { $exists : false },role:0})
        // console.log(users);
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports = {register,login,getAllPatients,getUnregPatients}