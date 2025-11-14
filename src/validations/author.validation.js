import Joi from "joi";

export const authorSchema = Joi.object({
    name: Joi.string().max(255).required()
});