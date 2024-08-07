
class ApiError extends Error {
     statusCode;
     status;
     isOperational;
    
    constructor(CustomMessage: string, statusCode: number) {
      super(CustomMessage);
  
      // Set the class properties
      this.message = CustomMessage;
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      
  
      // Ensure the error's stack trace is captured
      Error.captureStackTrace(this, this.constructor);
    }
}
  
export default ApiError;