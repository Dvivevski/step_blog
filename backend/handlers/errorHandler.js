const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      type: "ValidationError",
      message: err.message,
      details: err.details,
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      type: err.name,
      message: err.message,
      details: err.details,
    });
  }

  if (
    err.name === "SyntaxError" &&
    err.message.includes("Unexpected token") &&
    err.message.includes("in JSON at position")
  ) {
    return res.status(403).json({
      type: err.name,
      message: err.message,
      details: err.details,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(403).json({
      type: err.name,
      message: err.message,
      details: err.details,
    });
  }

  return res.status(err?.statusCode || err?.status || 500).json({
    message: err?.message || "Internal server error",
    details: err,
  });
};

module.exports = errorHandler;
