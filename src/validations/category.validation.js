import Joi from 'joi';

export const categorySchema = Joi.object({
    name: Joi.string().min(2).required().trim().messages({
        "any.required": "Nimetus on vajalik.",
        "string.min": "Nimetus peab olema vähemalt 2 tähemärki pikk.",
        "string.empty": "Nimetus ei tohi olla tühi.",
        "string.base": "Nimetus peab olema tekst."
    }),
});