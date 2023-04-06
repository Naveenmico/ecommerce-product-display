require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const morgan = require('morgan');
const server = express();
const productRouter = require('./routes/product')


//db connection code
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => { 
    console.log('Error connecting to MongoDB Atlas', error);
  });


//body praser
server.use(express.json());
server.use(morgan('deafult'))
server.use(express.static(process.env.PUBLIC_DIR))
server.use('/products',productRouter.router);

server.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'build','index.html'))
})

server.listen(process.env.PORT,()=>{
    console.log('server started')
});