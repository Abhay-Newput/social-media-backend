
class ApiError extends Error {
  statusCode;
  status;
  isOperational;

  constructor(customMessage: string, statusCode: number) {
    super(customMessage);

    // Set the class properties
    this.message = customMessage;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;


    // Ensure the error's stack trace is captured
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;