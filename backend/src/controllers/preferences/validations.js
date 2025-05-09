import Joi from 'joi';

const PreferencesSchema = Joi.object({
    category: Joi.string().required(),
});

export default PreferencesSchema;