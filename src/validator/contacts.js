import Joi from "joi";

export const contactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid("work", "home", "personal").required(),
})
