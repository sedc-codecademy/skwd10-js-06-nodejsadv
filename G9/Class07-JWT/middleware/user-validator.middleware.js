const Joi = require("joi");

//Creating a validation schema with joi
const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  age: Joi.number().min(13).max(100).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

//Creating the user validator middleware
const userValidator = (req, res, next) => {
  const userData = req.body;
  //Validating the user data
  const validation = userSchema.validate(userData);

  //Checking if there is a validation error
  if (validation?.error) {
    res.status(400).send({
      msg: validation.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = userValidator;
