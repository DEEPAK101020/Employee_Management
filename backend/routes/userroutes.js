const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const express=require("express");

const {userModel}=require("../model/user.model")
const {BlackListModel}=require("../model/blocklist.model")

const userRoute=express.Router();

userRoute.post("/signup",async(req,res)=>{
    const {email,password,confirmpassword}=req.body;
    if(password!=confirmpassword){
        res.status(400).json({msg:"pasword mismatched"})
    }
    else{
    try {
        const exist=await userModel.findOne({email})
        if(exist){
            res.status(400).json({msg:"user already exist"})
            
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    const newuser=new userModel({email,password:hash})
                    await newuser.save();
                    res.status(200).json({msg:"new user registered"})
                }
                else{
                    res.status(400).json({msg:"error hashing password"})
                }
            })
        }
        } catch (error) {
            res.status(400).json({err:error})
    }
}
})


userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const exist=await userModel.findOne({email});
        if(exist){
            bcrypt.compare(password,exist.password,(err,pass)=>{
                if (err) {
                    return res.status(401).json({ msg: "Invalid credentials" });
                }
                if (pass) {
                    const secret_key = process.env.secret_key;
                    const token = jwt.sign({ userID: exist._id }, secret_key, { expiresIn: "7d" });
                    res.status(200).json({msg: token });
                }
            })
        }
    } catch (error) {
        return res.status(401).json({ msg: "error while logging" });
    }
})

//logout
userRoute.get("/logout",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
         res.status(401).json({ msg: "No token provided" });
    }
    try {
        const tokenexist=await BlackListModel.findOne({token})
        if(!tokenexist){
            const blaklist=new BlackListModel({token});
            await blaklist.save();
             res.status(200).json({ msg: "session logged out" });
        }else{
            return res.status(401).json({ msg: "token already blacklisted" });
        }
    } catch (error) {
         res.status(401).json({ msg:error });
    }
})

module.exports={
    userRoute
}