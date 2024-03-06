import Joi from "joi"

const getUserValidation = Joi.string().email().max(100).required()

const updateUserValidation = Joi.object ({
    name: Joi.string().max(255).optional(),
    no_hp: Joi.string().max(12).optional(),
    email: Joi.string().required()
})

export {
    getUserValidation,
    updateUserValidation,
}