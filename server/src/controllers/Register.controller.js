//Register.controller.js

import { validationResult } from 'express-validator';
import { jsonGenerate } from '../utils/helpers.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import JWT_TOKEN_SECRET, { StatusCode } from '../utils/constants.js';
import JWT from 'jsonwebtoken';

const Register = async(req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {name, username, password, email} = req.body;

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
  

    // use the hashed password for further processing

    const userExist=await User.findOne({ $or: [{
      email:  email
     }, {
     username: username
    }]})

    if(userExist){
      return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"User or email id already exist"))
    }



    try{
      const result=await User.create({
     name:name,
     email:email,
     password:hashedPassword,
     username:username
     
     })
   

     const token = JWT.sign({ userId: result._id }, JWT_TOKEN_SECRET);

     res.json(jsonGenerate(StatusCode.SUCCESS, "Registration Successful", {userId:result._id,token:token}));
    } 
    catch(error) {
     console.log(error)
     
     }
  } 
  
  res.status(400).json(jsonGenerate(400, "Validation error", errors.mapped()));
}


export default Register;