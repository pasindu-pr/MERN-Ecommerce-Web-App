import Joi from "joi";

const registerInfoValidate = (name, email, password, confirmPassword) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "lk"] },
    }),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref("password"),
  });

  const validatedValues = schema.validate({
    name,
    email,
    password,
    confirmPassword,
  });

  return validatedValues;
};

export { registerInfoValidate };
