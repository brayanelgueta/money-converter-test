const express = require("express");
const router = express.Router();
const userController = require('../../controllers/userController')
const conversorController = require('../../controllers/conversorController')

router
  .get("/",(req, res) => [res.send(`<h1>Hello desde ${req.baseUrl}</h1>`)])

  //User Routes
  .post('/register', userController.register)
  .post('/login', userController.login)
  .get('/user', userController.getUser)
  .post('/logout', userController.logout)
  .post('/refresh', userController.refresh)

  //Conversor Routes
    .post('/getConvertion', conversorController.getConvertion)
    .get('/getHistory', conversorController.getHistory)
module.exports = router