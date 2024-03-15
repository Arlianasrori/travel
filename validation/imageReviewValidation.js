import Joi from "joi"

export const imageReviewValidation = Joi.object ({
    id : Joi.number().required(),
    destination_reviews_id : Joi.number().required(),
    image : Joi.string().max(1500).required()
})