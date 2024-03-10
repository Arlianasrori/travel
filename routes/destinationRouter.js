import express from "express"
import { add, addFeature, addFeaturecategories, addGallery, deleteDestination, deleteFeature, deleteGallery, updateCategories, updateDestination, updateFeature, updateThumbnail } from "../controller/destinationController.js"
import { adminDestinationMiddleware } from "../middleware/adminDestinationMiddleware.js"

export const destinationRouter = express.Router()

// destination
destinationRouter.post("/add",adminDestinationMiddleware,add)
destinationRouter.delete("/delete/:id",adminDestinationMiddleware,deleteDestination)
destinationRouter.patch("/update/:id",adminDestinationMiddleware,updateDestination)
destinationRouter.patch("/updateThumbnail/:id",adminDestinationMiddleware,updateThumbnail)
// feature
destinationRouter.post("/featureCategories/add",adminDestinationMiddleware,addFeaturecategories)
destinationRouter.put("/featureCategories/update/:id",adminDestinationMiddleware,updateCategories)
destinationRouter.delete("/featureCategories/delete/:id",adminDestinationMiddleware,updateCategories)
destinationRouter.post("/feature/add",adminDestinationMiddleware,addFeature)
destinationRouter.delete("/feature/delete/:id",adminDestinationMiddleware,deleteFeature)
destinationRouter.put("/feature/update/:id",adminDestinationMiddleware,updateFeature)
// gallery
destinationRouter.post("/gellery/add/:id",addGallery)
destinationRouter.post("/gellery/delete/:id",deleteGallery)

