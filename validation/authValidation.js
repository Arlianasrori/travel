import joi from 'joi'

export const registerValidation = joi.object({
    email : joi.string().email().max(255).required(),
    no_hp : joi.string().max(12).required(),
    password : joi.string().max(255).required(),
    name : joi.string().max(255).required()
})

export const alamatValidation = joi.object({
    village : joi.string().max(255).required(),
    subdistrick : joi.string().max(255).required(),
    regency : joi.string().max(255).required(),
    province : joi.string().max(255).required(),
    country : joi.string().max(255).required(),
    kode_pos : joi.number().required()
})

