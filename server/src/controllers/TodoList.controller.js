import user from "../models/user.js"
import { StatusCode } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helpers.js"

export const GetTodos = async(req,res) => {
    try{
    const list =await user.findById(req.userId)
    .select("-password")
    .populate('todos')
    .exec()

    return res.json(jsonGenerate(StatusCode.SUCCESS,"All todo list",list))
    }
    catch(error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Error",error))
    }
}