const express = require('express');
const authRouter=express.Router();
const userData = require('../models/userData');
const projectuserData = require('../models/projectData');
const projectNameData =require('../models/projectNameData');
path=require('path')
authRouter.post('/adduser',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    var user = {
        name : req.body.user.name,
        email : req.body.user.email,
        password: req.body.user.password,
    }
    console.log("database reached")
    var users = new userData(user);
    users.save();
})
authRouter.get('/getproject',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    
    projectNameData.find()
        .then((users)=>{
            console.log(users)
            res.send(users);
        });
});

authRouter.post('/authuser',(req,res)=>{
        let users=req.body;
        email = users.users.email,
        password=users.users.password,
        console.log(req.body)
        console.log(email);
        console.log(password);
        console.log("logged in user");
        userData.findOne({email: email},(err,user)=>{
            if(err){
                err.json('Invalid Login')
            }else{
                if(user.email!==email){
                    console.log('Invalid Email')
                    res.json('Invalid Email')
                }else
                if(user.password!==password){
                    console.log('Invalid password')
                    res.json('Invalid Password')
    
                }else{
                    if(user.name=="admin"){
                        res.json(user);
                    }else{
                        let name= user.name;
                        let project = users.users.project;
                        console.log(name);
                        projectuserData.findOne({name : name, project : project})
                        .then((users)=>{
                            console.log(users);
                            res.send(users);
                    });
                }
                }
            }    
        });
    })




module.exports=authRouter;