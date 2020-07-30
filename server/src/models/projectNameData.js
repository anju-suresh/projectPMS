const mongoos=require('mongoose');

var mongodb= 'mongodb://localhost:27017/PtmDb';
mongoos.connect(mongodb,{useNewUrlParser: true})
 
 const schema=mongoos.Schema;

 const projectSchema=new schema({
     project:String,
     description:String,
     
 });
 
 var projectdata=mongoos.model('projectdata',projectSchema);
 module.exports=projectdata;
