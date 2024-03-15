import express from "express"
import favoritDestinationController from "../controller/favoritDestinationController.js"

export const favoritDestination = express.Router()

favoritDestination.post('/add', favoritDestinationController.favoritDestination)
favoritDestination.delete('/delete', favoritDestinationController.deleteFavorit)