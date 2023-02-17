const express=require("express")

const {UserModel}=require("../model/User.model")

const jwt=require("jsonwebtoken")

const bcrypt=require('bcrypt') 

const userRouter=express.Router()

require("dotenv").config()

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    const existuser=await UserModel.findOne({email:email})
    try {
        if(existuser){
            res.status(403).send({"msg":"User already exist."})
        }else{
            bcrypt.hash(pass, 5, async(err, hash)=> {
                if(hash){
                    console.log(hash)
                    const user=new UserModel({name,email,pass:hash})
                    await user.save()
                    res.status(200).send({"msg":"New user has been added"})
                }else{
                    res.status(400).send({"msg":"Something went wrong"})
                }
            });
        }
    }catch (error) {
        res.status(400).send(error.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user[0]._id},process.env.secret_key)
                    res.status(200).send({"msg":"logged in","token":token})
                }else{
                    res.status(400).send({"msg":"wrong cred"})
                }
            })  
        }else{
            res.status(400).send({"msg":"wrong cred"})
        }
    }catch (error){
        res.status(400).send({"msg":error.message})
    }
})

module.exports={
    userRouter
}