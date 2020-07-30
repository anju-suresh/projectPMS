const mongoos=require('mongoose');

var mongodb= 'mongodb://localhost:27017/PtmDb';
mongoos.connect(mongodb,{useNewUrlParser: true})
 
 const schema=mongoos.Schema;

 const taskSchema=new schema({
    taskid : Number,
    project : String, 
    task : String,
    user : String,
    date : Date,
 });
 
 var taskdata=mongoos.model('taskdata',taskSchema);
 module.exports=taskdata;