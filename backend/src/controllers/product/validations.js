import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.string().required(),
  category: Joi.string().required(),
  photos: Joi.string(),
});

export default ProductSchema;
