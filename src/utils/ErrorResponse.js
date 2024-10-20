class ErrorResponse extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    error = [],
    stack = ""
  ) {}
}
