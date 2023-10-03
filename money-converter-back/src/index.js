const express = require("express");
const mongoose = require("mongoose");
const { configDotenv } = require("dotenv");
const path = require('path')

const {connect} = require("./config/database") ;
const {credentials} = require("./config/credentials")
const {corsOptions} = require("./config/cors")
const {authentication} = require("./middleware/authentication")

const cors = require("cors");
const cookieParser = require("cookie-parser");
const v1Router = require("./v1/routes");

configDotenv()

const PORT = process.env.PORT || 3000;
const app = express();

connect()
// mongoose
//   .connect(
//     "mongodb://mongo:qrv2IERvUa896J3Gj3ve@containers-us-west-69.railway.app:7655",
//     {}
//   )
//   .then(() => {
//     console.log("connected");
//   });

app.use(credentials)
app.use(
  cors(corsOptions)
);
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());
app.use(authentication)
app.use('/static', express.static(path.resolve("public")))



app.use("/api/v1", v1Router);

app.all('*', (req, res)=>{
  res.status(404)

  if(req.accepts('json')){
      res.json({error: '404 not found'})
  }else{
      res.type('text').send('404 not found')
  }
})

mongoose.connection.once('open', ()=>{
  console.log('db conected ')
  app.listen(PORT, ()=>console.log(`server running at ${PORT}`))
})
