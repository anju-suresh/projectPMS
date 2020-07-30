const mongoos=require('mongoose');

var mongodb= 'mongodb://localhost:27017/PtmDb';
mongoos.connect(mongodb,{useNewUrlParser: true})
 
 const schema=mongoos.Schema;

 const progressSchema=new schema({
     project:String,
     taskid : Number,
     task : String,
     user : String,
     date: Date,
     status: String
 });
 
 var progressdata=mongoos.model('progressdata',progressSchema);
 module.exports=progressdata;
