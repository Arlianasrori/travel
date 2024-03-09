import express from "express";
import myDestinationController from "../controller/myDestinationController.js";

export const myDestination = express.Router();

myDestination.post("/add", myDestinationController.myDestination);
myDestination.delete("/delete", myDestinationController.deleteMyDestination);
