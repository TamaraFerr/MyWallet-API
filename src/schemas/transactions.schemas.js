import Joi from "joi";

export const transactionsSchema = Joi.object({
    value: Joi.number().positive().required(),
    description: Joi.string().required(),
    type: Joi.string().required().valid("entrada", "saída")
})