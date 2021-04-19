import Joi from "joi";

const checkShippingDetails = (
  fName,
  lName,
  address1,
  address2,
  city,
  state
) => {
  const schema = Joi.object({
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  });

  return schema.validate({
    fName,
    lName,
    address1,
    address2,
    state,
    city,
  });
};

export { checkShippingDetails };
