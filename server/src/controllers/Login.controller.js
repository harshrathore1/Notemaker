import { validationResult } from "express-validator";
import User from '../models/user.js';

import JWT_TOKEN_SECRET, { StatusCode } from "../utils/constants.js";

import { jsonGenerate } from "../utils/helpers.js";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

//Login.controller.js

const Login = async (req, res) => {
const errors =validationResult(req);


if(errors.isEmpty()){
    const { username,password } = req.body;

const user = await User.findOne({username:username });

if(!user) {
return res.json(
jsonGenerate(
StatusCode.UNPROCESSABLE_ENTITY,
"username or password is incorrect"
)
);
}
const verified=bcrypt.compareSync(password,user.password);

if(!verified) {
    return res.json(
        jsonGenerate(
            StatusCode.UNPROCESSABLE_ENTITY,
            "username or password is incorrect"
            )
            );
            }


const token = JWT.sign({ userId: user._id },JWT_TOKEN_SECRET );
return res.json(jsonGenerate(StatusCode.SUCCESS, "Login Successful", {userId:user._id,token:token}));
 }
 res.json(jsonGenerate(StatusCode.VALIDATION_ERROR ,"Validation error",errors.mapped()));
    };
    
    export default Login;

    