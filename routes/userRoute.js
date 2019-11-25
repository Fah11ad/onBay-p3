const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


process.env.SECRET_KEY = 'secret'
// rigister steps (1-regist)
router.post('/register', (req, res) => {
    const newUser = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        phoneNumber: req.body.phoneNumber,
        password : req.body.password
        
    }
    console.log(newUser)
    // Search if email is exist or not
    User.findOne({email : req.body.email})
    .then(user => {
        // if email not exist
        if(!user){
            // hashing step
           
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
              newUser.password = hash
              
              User.create(newUser)
              .then(user => res.send("user created" + newUser.email))
              .catch(err => res.send(err))
              console.log(bcrypt.compareSync(req.body.password , newUser.password))
              // res.send("s")
            })
          }
        // if email is exist
        else {
            res.send(`email is already used`)
        }
    })
    .catch(err => res.send(err))
})
// get all user test 
// router.get('/test' , (req , res)=>{
//   var test = ""
//   bcrypt.hash("123456", 10, (err, hash)=>{
//     test = hash
//     console.log(test)
//     console.log(bcrypt.compareSync("123456", "$2b$10$7MxDTxKgUeDuOvST2M1au.CBY0BL9DI9nT7ziXEN1RviaU/j/pHHK"))
//   })
  
  

//   User.find()
//   .then(user =>res.send(user))
// })

// Login steps (1-login) 
router.post('/login', (req, res)=> {
    //check email is exist or not
    
    User.findOne({email: req.body.email})
    .then(user => {
        // if email is exist
       
        if(user) {
            console.log(req.body.password)
            console.log(user.password)

            console.log(bcrypt.compareSync(req.body.password.toString() , user.password))
 
            if(bcrypt.compareSync( req.body.password, user.password)){

                user.password = "" //  "" we don't want password to appear
                var paylod = {user}
                let token = jwt.sign(paylod, 'secret', {expiresIn: 1440})  
                res.send(token) 
            }
            // if password not the same
            else {
                res.send("password is not currect")
            }
        }
        else {
            // if email not exist
            console.log("yess")
            res.send("email is not found")
        }
    })
    .catch(err => res.send(err))
})
// Logout steps
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });


// we comment the below code because we want to do it with React 
// get user (2-login) convert token to data and find it in our database

// router.get('/profile', (req, res) =>{
//     var decoded = jwt.verify(req.body.token, 'secret')

//     User.findById(decoded.user._id)
//     .then(user => user ? res.json(decoded.user) : res.send("token is not correct"))
//     .catch(err => res.send(err))
// })
// now we can check it in postman by GET with {
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZDk0NTc2NGYwMWU1NTdkZjI3YjU5MSIsImZpcnN0X25hbWUiOiJmYWhhZCIsImxhc3RfbmFtZSI6ImFscSIsImVtYWlsIjoiZkBmLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE14d3R1eVYwY3VQU1ZNNUtDV1Ztbk9teW1iUi9yM3ZjVEdxalE2NVdzOHNrd0tCV3VqQXplIiwiY3JlYXRlZEF0IjoiMjAxOS0xMS0yM1QxNDo0MzowMi4yMDJaIiwidXBkYXRlZEF0IjoiMjAxOS0xMS0yM1QxNDo0MzowMi4yMDJaIiwiX192IjowfSwiaWF0IjoxNTc0NTIzMjg4LCJleHAiOjE1NzQ1MjQ3Mjh9.Aj6Q7Wq8YBM3vkXWZTGzUWrdzfnU_vECXpJY2LZfexc"
// }

module.exports = router