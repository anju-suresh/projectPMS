const mongoos=require('mongoose');

var mongodb= 'mongodb://localhost:27017/PtmDb';
mongoos.connect(mongodb,{useNewUrlParser: true})
 
 const schema=mongoos.Schema;

 const userSchema=new schema({
     name:String,
     email:String,
     password:String,
 });
 
 var userdata=mongoos.model('userdata',userSchema);
 module.exports=userdata;
