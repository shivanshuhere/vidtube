class ErrorResponse extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    error = [],
    stack = ""
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.stack = stack;
  }
}

export default ErrorResponse;
