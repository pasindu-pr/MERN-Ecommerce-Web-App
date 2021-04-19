import Joi from "joi";

const checkProductDetails = (product) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    imageName: Joi.string().required(),
    description: Joi.string().required(),
    stockCount: Joi.number().required(),
    price: Joi.number().required(),
  });

  return schema.validate({
    name: product.name,
    category: product.category,
    brand: product.brand,
    imageName: product.image,
    description: product.description,
    stockCount: product.countInStock,
    price: product.price,
  });
};

export { checkProductDetails };
