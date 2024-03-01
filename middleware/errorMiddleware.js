import { responseError } from "../error/responseError.js"
export const errorMiddleware = (err,req,res) => {
    console.log("hay ini erro");
    if(err instanceof responseError) {
        res.status(err.status).json({msg : err.message})
    }
    res.status(500).json({msg : err.message})
}