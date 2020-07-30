const express = require('express');
const userRouter=express.Router();
path=require('path');
const progressData = require('../models/progressData');
const completedData = require('../models/completedData');
const taskData = require("../models/taskData");
userRouter.get('/getProgress/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    progressData.find({project : id, status: "accept"})
        .then((progress)=>{
            res.json(progress);
            console.log(progress + "progress data");
        })
        
});
userRouter.post('/addprogress',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.body.id;
    taskData.findOne({_id : id})
    .then((status)=>{
        // res.json(progress);
        // progreses=JSON.stringify(progress);
        console.log(status + "completed progress data");
    var user = {
        project : status.project,
        taskid : status.taskid,
        task : status.task,
        user : status.user,
        date: status.date,
        status: req.body.progress.status
    }
    console.log("database reached")
    var users = new progressData(user);
    users.save();
    taskData.deleteOne({_id:id})
    .then((res)=>{
        console.log(deleted);
    })
    })
   

})
userRouter.post('/addCompleted',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.body.id;
    console.log(id);
    progressData.findOne({_id : id})
        .then((progress)=>{
            // res.json(progress);
            // progreses=JSON.stringify(progress);
            console.log(progress + "completed progress data");
            console.log(progress.project);
    var user = {
        project : progress.project,
        taskid : progress.taskid,
        task : progress.task,
        user : progress.user,
        date: progress.date,
        completed: req.body.completed.completed
    }
    console.log("database reached")
    var users = new completedData(user);
    users.save();
    progressData.deleteOne({_id:id})
    .then((res)=>{
        console.log(deleted);
    })
    })
})

userRouter.get('/getRejected/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    progressData.find({project : id, status: "reject"})
        .then((reject)=>{
            res.json(reject);
            console.log(reject + "reject data");
        })
        
});
userRouter.get('/getCompleted/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    completedData.find({project : id})
        .then((complete)=>{
            res.json(complete);
            console.log(complete + "complete data");
        })
        
});
module.exports=userRouter;


