const {Router} =  require('express');
const bcrypt = require('bcrypt')
const userController = Router();
const {userModel} = require("../models/User.model")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../Config/db")

userController.post("/signup",(req,res)=>{
    const {name , email , password} = req.body
    bcrypt.hash(password,5, async function(err,hash){
        if(err){
            res.send({msg: "Something went wrong"})
        }
        const user = new userModel({
            name,
            email,
            password :hash
        })
        try {
            await user.save()
            res.send({msg: "Signup successfull"})
        } catch (error) {
            console.log(error)
            res.send({msg:"Something went wrong"})
        }
    })
});


userController.post("/login", async(req,res)=>{
    const{email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        res.send({msg: "Signup first"})
    }
    const hash = user.password
    bcrypt.compare(password,hash, function(err,result){
        if(err){
            res.send({msg:"Something went wrong"})
        }
        if(result){
            const token = jwt.sign({userId: user._id},JWT_SECRET)
            res.send({msg: "Login successfull", token: token})
        }
        else{
            res.send({msg: "Invalid credential"})
        }
    })
});

module.exports = {
    userController
}