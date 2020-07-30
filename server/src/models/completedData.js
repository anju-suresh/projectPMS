const mongoos=require('mongoose');

var mongodb= 'mongodb://localhost:27017/PtmDb';
mongoos.connect(mongodb,{useNewUrlParser: true})
 
 const schema=mongoos.Schema;

 const completedSchema=new schema({
     project:String,
     taskid : Number,
     task : String,
     user : String,
     date: Date,
     completed: String
 });
 
 var completeddata=mongoos.model('completeddata',completedSchema);
 module.exports=completeddata;
