import { responseError } from "../error/responseError.js"

export const validate = async (validationSchema,object) => {
    const valdation = await validationSchema.validate(object)

    if(valdation.error) {
        throw new responseError(400,valdation.error.message)
    }

    return valdation.value
}