class ApiError extends Error {
  constructor(errorCode, message, statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;