const express = require('express');
const adminRouter=express.Router();
const projectuserData = require('../models/projectData');
const projectData=require('../models/projectNameData');
const taskData= require('../models/taskData');
const progressData = require('../models/progressData');
path=require('path');
adminRouter.post('/add',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var user = {
        project:req.body.user.project,
        name : req.body.user.name,
        role : req.body.user.role,
        email : req.body.user.email,
        password: req.body.user.password,
    }
    console.log("database reached")
    var users = new projectuserData(user);
    users.save();
})

adminRouter.post('/addProject',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    projectData.find({project : req.body.project.project},(err,val)=>{
        if(val.length){
            res.json("Already Exists Project");
        }else{
            var user = {
                project:req.body.project.project,
                description : req.body.project.description,
            }
            console.log("database reached")
            var users = new projectData(user);
            users.save();
        }
    })
    
    
})
adminRouter.post('/getemployee',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body.project)
    projectuserData.find({role : "employee",project: req.body.project})
        .then((users)=>{
            console.log(users)
            res.send(users);
        });
});
adminRouter.get('/getUsers/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    projectuserData.find({project : id})
        .then((users)=>{
            res.send(users);
        });
});
adminRouter.get('/gettasks/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    id=req.params.id;
    taskData.find({project : id})
        .then((users)=>{
            res.json(users);
        });
});

var i =1;
adminRouter.post('/addTask',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);

    var task = {
        taskid : i++,
        project : req.body.task.project,
        task : req.body.task.task,
        user : req.body.task.teammate,
        date: req.body.task.date
        
    }
    console.log(task.taskid);
    console.log("database reached")
    var task = new taskData(task);
    task.save();
})

adminRouter.get("/delete/:id",(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
            id=req.params.id;
            console.log(id);
            taskData.findOneAndDelete({_id : id}, (error, result) =>{
                if (error) {
                    throw error;
                } else {
                    res.status(200);
                    console.log("deleted")
                }
            }).then(()=>{
                tasktData.find()
                .then((tasks)=>{
                   res.send(tasks);
                });
            });
    });


    adminRouter.get("/update/:id",(req,res)=>{
        res.header('Access-Control-Allow-Origin','*')
        res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
                id=req.params.id;
                console.log(id);
                taskData.findOne({_id: id})
                .then((tasks)=>{
                    console.log(tasks);
                    res.send(tasks);
                
                });
        });
        adminRouter.post("/update",(req,res)=>{
            res.header('Access-Control-Allow-Origin','*')
            res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
                    
            var task = {
                _id: req.body.task._id,
                task : req.body.task.task,
                user : req.body.task.user,
                date: req.body.task.date
                
            }
                    taskData.findOne({_id: task._id})
                    .then((updatetask)=> {
                        if (!updatetask) {
                            return next(new Error('Could not load Document'));
                        }
                        else {
                            var updatedtask = new taskData(task);
                            console.log("findOne"+updatetask)
                            console.log("findOne update"+updatedtask)
                            taskData.findByIdAndUpdate(updatedtask._id, updatedtask, (er, updated) => {
                                console.log("updated"+updated);
                            });
                        }                
                    });  
            });


module.exports=adminRouter;