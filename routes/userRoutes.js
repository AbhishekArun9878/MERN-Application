const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('../model/user');

router.use(express.json())
//signup route
router.post('/',async(req, res)=>{
  try {
    const data = req.body;
    let newUser = await users(data).save();
    console.log(newUser);
    res.status(200).send({message:"User Added"})
  } catch (error) {
    console.log(error)
  }

})

router.post('/login',async(req,res)=>{
  let username= req.body.username;
  let password =req.body.password;

  const user = await users.findOne({username:username});
  if(!user){
      res.json({message:"User not found"});
  }
  try {
     if(user.password== password) {
      let payload ={user:username,pwd:password}
      let token = jwt.sign(payload,'reactblogapp');
      res.send({message:'login success', token:token})
     }
     else{
      res.json({message:"Login failed"})
     }
  } catch (error) {
      console.log(error)
  }
})


module.exports = router