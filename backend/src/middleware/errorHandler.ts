import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? null : err.stack,
    });
  }

  console.error('ERROR:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

export default errorHandler;
