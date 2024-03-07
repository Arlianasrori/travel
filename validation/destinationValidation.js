import joi from "joi"

export const addDestinationValidation = joi.object({
    id : joi.number().required(),
    nama :  joi.string().max(255).required(),
    deks : joi.string().max(1500).required(),
    thumbnail :  joi.string().max(1500).required(),
    price : joi.number().required(),
    add_by : joi.string().email().required()
})

export const addDestinationAlamatValidation = joi.object({
    destination_id :  joi.number().required(),
    village : joi.string().max(500).required(),
    subdistrick : joi.string().max(500).required(),
    regency : joi.string().max(500).required(),
    province : joi.string().max(500).required(),
    country : joi.string().max(500).required(),
    detail_format : joi.string().max(500).required(),
    latitude : joi.number().required(),
    longtitude : joi.number().required() 
})

export const deleteDestinationValidation = joi.string().required()

export const updateDestinationValidation = joi.object({
    id : joi.number().required(),
    nama :  joi.string().max(255).optional(),
    deks : joi.string().max(1500).optional(),
    price : joi.number().optional()
})
export const addFeatureCategoriesDestinationValidation = joi.object({
    nama :  joi.string().max(255).required(),
    detail : joi.string().max(1500).required(),
})
export const addFeatureDestinationValidation = joi.object({
    destination_id : joi.number().max(255).required(),
    feature_id : joi.number().max(255).required(),
})
export const addDestinationGalerryValidation = joi.object({
  destination_id : joi.number().required(),
  image : joi.string().max(1500).required(),
})
