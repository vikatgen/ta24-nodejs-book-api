import Joi from 'joi';

export const authSchema = Joi.object({
   email: Joi.string().email().required().messages({
       "string.email": "Email on valel kujul.",
       "any.required": "Email on vajalik."
   }),
   password: Joi.string().min(8).required().messages({
       "string.min": "Minimaalne pikkus on 8 tähemärki.",
       "any.required": "Parool on vajalik."
   })
});