const validateData = require("../validators/validator");

const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = validateData(schema)(req.body);

  if (error) throw error;

  next();
};

module.exports = validateRequest;
