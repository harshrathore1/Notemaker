//todo.controller.js
import { validationResult } from "express-validator";
import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Todo from "../models/Todo.js";
import User from "../models/user.js";


export const createTodo = async(req, res) => {
    

    

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.json(
            jsonGenerate(
                StatusCode.VALIDATION_ERROR,
                "Todo is required",
                errors.mapped()
            )
        );
        }

        try {
            const result= await Todo.create({
                userId:req.userId,
                desc: req.body.desc,
                })
                if(result){
                    const user = await User.findOneAndUpdate(
                        {_id: req.userId},
                    {
                        $push: { todos: result },
                    }
                    );
                    return res.json(
                        jsonGenerate(StatusCode.SUCCESS,"Todo created Sucessfully",result)
                        );
                        
                }
        } catch (error) {
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,("Something went wrong",error)))
        }
    };