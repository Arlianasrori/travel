import express from "express"
import reviewController from "../controller/reviewController.js"

export const reviewRouter = express.Router()

reviewRouter.post('/add', reviewController.review)
reviewRouter.patch('/update', reviewController.update)
reviewRouter.delete('/delete', reviewController.deleted)