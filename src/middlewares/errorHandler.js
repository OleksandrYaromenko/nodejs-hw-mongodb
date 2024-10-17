import {isHttpError} from "http-errors";


export default function errorHandler (error,req,res,next){
  if (isHttpError(error)===true) {
    return res
    .status(error.statusCode)
    .json({status: error.statusCode,message:error.message})
  }
    return res.status(500).json({
       status: 500,
        message: "Something went wrong",
        data: error.message
      });
    }