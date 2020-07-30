const mongoos=require('mongoose');

var mongodb= 'mongodb://localhost:27017/PtmDb';
mongoos.connect(mongodb,{useNewUrlParser: true})
 
 const schema=mongoos.Schema;

 const projectSchema=new schema({
     project:String,
     name:String,
     role:String,
     email:String,
     password:String,
 });
 
 var projectuserdata=mongoos.model('projectuserdata',projectSchema);
 module.exports=projectuserdata;
