import express from "express";
import userController from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const userRouter = express.Router()

userRouter.get('/getUser/:email', userController.getUser)
userRouter.patch('/updateUser',authMiddleware,userController.updateUser)
userRouter.get('/getAllUser', userController.getAllUser)