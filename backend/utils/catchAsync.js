exports.catchAsync = (func) => async (req, res, next) => {
  try {
    await func(req, res);
  } catch (error) {
    next(error);
  }
};
