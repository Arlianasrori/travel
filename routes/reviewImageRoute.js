import express from "express";
import reviewImageController from "../controller/reviewImageController.js";

export const imageRoute = express.Router();

imageRoute.post("/upload",reviewImageController.upload);
imageRoute.delete("/delete/:id",reviewImageController.deleteImage);