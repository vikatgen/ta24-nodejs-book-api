import Joi from "joi";

export const bookingSchema = Joi.object({
    book_id: Joi.number().integer().positive().required(),
    return_date: Joi.date().iso().greater('now').required()
});