const validateData = (schema) => (payload) => schema.validate(payload);
module.exports = validateData;
