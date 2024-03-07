import express from "express"
import { add, deleteDestination, updateDestination, updateThumbnail } from "../controller/destinationController.js"
import { adminDestinationMiddleware } from "../middleware/adminDestinationMiddleware.js"

export const destinationRouter = express.Router()

destinationRouter.post("/add",adminDestinationMiddleware,add)
destinationRouter.delete("/delete/:id",adminDestinationMiddleware,deleteDestination)
destinationRouter.patch("/update/:id",adminDestinationMiddleware,updateDestination)
destinationRouter.patch("/updateThumbnail/:id",adminDestinationMiddleware,updateThumbnail)