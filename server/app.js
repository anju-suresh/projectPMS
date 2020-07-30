const express = require('express');
const authRouter =require('./src/routes/authRouter');
const adminRouter = require('./src/routes/adminRouter');
const userRouter = require('./src/routes/userRouter');

const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())
app.use(cors());

app.use('/auth',authRouter);
app.use('/admin',adminRouter);
app.use('/user',userRouter);


app.listen(3000,()=>{
console.log('Listening at 3000');
})