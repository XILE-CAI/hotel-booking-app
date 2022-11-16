import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token
    //if token not existed
    if(!token){
        return next(createError(401,"You are not authenticated!"))
    }

    //if token existed, then verify token using .env JWT
    jwt.verify(token, process.env.JWT,(err,user)=>{
        // have a token but is invalid
        if(err){
            return next(createError(403,"Token is not valid!"))
        }
        //if everything is ok. new request
        req.user = user;
        next()
    })
}

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res, next, () =>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}