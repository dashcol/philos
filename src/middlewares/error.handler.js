export class ApplicationError extends Error{
    constructor(code,message){
        super(message);
        this.code=code;
        Error.captureStackTrace(this,this.constructor);
    }
}

export const appErrorMiddleware=(err,req,res,next)=>{
    err.code=err.code||500;
    err.message=err.message||"Server ERROR ! try again later";
    res.status(err.code).json({sucess:false,error:err.message});
    next();
}