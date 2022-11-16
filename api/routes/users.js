import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get('/checkAuthentication', verifyToken, (req,res,next) => {
//     res.send("hello, you are authenticated!")
// })

// router.get('/checkUser/:id', verifyUser, (req,res,next) => {
//     res.send("hello, you are logged in and you can delete your account")
// })

// router.get('/checkAdmin/:id', verifyAdmin, (req,res,next) => {
//     res.send("hello Admin, you are logged in and you can delete all account")
// })

//update user
router.put('/:id',verifyUser,updateUser)

//delete user
router.delete('/:id',verifyUser,deleteUser)

//get one user
router.get('/:id',verifyUser,getUser)

//get all users
router.get('/',verifyAdmin,getUsers)



export default router