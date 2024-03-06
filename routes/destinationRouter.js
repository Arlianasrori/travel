import express from "express"
import { add } from "../controller/destinationController.js"

export const destinationRouter = express.Router()

destinationRouter.post("/add",add)