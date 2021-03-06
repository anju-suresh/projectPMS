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
    progressData.find({project : id, status: "Accepted"})
        .then((progress)=>{
            res.json(progress);
            console.log(progress + "progress data");
        })
        
});
userRouter.post('/addprogress',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    pid=req.body.id;
    taskData.findOne({_id : pid})
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
    console.log(pid);
    taskData.deleteOne({_id: pid})
    .then((res)=>{
        console.log("deleted");
    })
    })
   

})
userRouter.post('/addCompleted',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.body.id;
    console.log(id);
    console.log( req.body.status +"completed Status");
    var stat=req.body.status;
    progressData.findOne({_id : id})
        .then((progress)=>{
            // res.json(progress);
            // progreses=JSON.stringify(progress);
            console.log(progress + "completed progress data");
           
    var user = {
        project : progress.project,
        taskid : progress.taskid,
        task : progress.task,
        user : progress.user,
        date: progress.date,
        completed: stat
    }
    console.log(user+"database reached")
    var users = new completedData(user);
    users.save();
    progressData.deleteOne({_id:id})
    .then((res)=>{
        console.log("deleted");
    })
    })
})

userRouter.get('/getRejected/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    progressData.find({project : id, status: "Rejected"})
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
userRouter.get('/getusertasks/:id/:user',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    user=req.params.user;
    taskData.find({project : id,user : user})
        .then((users)=>{
            res.json(users);
        });
});
userRouter.get('/getuserRejected/:id/:name',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    name= req.params.name;
    progressData.find({project : id,user : name, status: "Rejected"})
        .then((reject)=>{
            res.json(reject);
            console.log(reject + "reject data");
        })
        
});
userRouter.get('/getuserCompleted/:id/:name',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    name =req.params.name;
    completedData.find({project : id,user : name })
        .then((complete)=>{
            res.json(complete);
            console.log(complete + "complete data");
        })
        
});
userRouter.get('/getuserProgress/:id/:name',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    name =req.params.name;
    progressData.find({project : id, user : name, status: "Accepted"})
        .then((progress)=>{
            res.json(progress);
            console.log(progress + "progress data");
        })
        
});
module.exports=userRouter;


