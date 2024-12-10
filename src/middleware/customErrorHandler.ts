import { Request, Response, NextFunction } from 'express';
import Logger from '../utility/logger';

const handleUnknownError = (error: any, res: Response) => {
  res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong. Please try again later.',
  });
};

const handleDuplicateKeyError = (error: any, res: Response) => {
  const capitalizedKeys = Object.keys(error.keyValue).map(
    key => key.charAt(0).toUpperCase() + key.slice(1),
  );
  const capitalizedKeysString = capitalizedKeys.join(', ');
  res.status(409).json({
    success: false,
    message: `Value for ${capitalizedKeysString} already exist. Please enter another value.`,
  });
};

const handleCastError = (error: any, res: Response) => {
  res.status(400).json({
    success: false,
    message: `Invalid value '${error.value}' for ${error.path}.`,
  });
};
const handleValidationError = (error: any, res: Response) => {
  const errors = Object.values(error.errors).map(
    (value: any) => value.path.charAt(0).toUpperCase() + value.path.slice(1),
  );
  const errorsString =
    errors?.length > 1
      ? `Values for ${errors.join(', ')} are required.`
      : `Value for ${errors} is required.`;
  res.status(400).json({
    success: false,
    message: errorsString,
  });
};
const handleInvalidJsonBody = (_: any, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Request body must be in a valid json format.',
  });
};

const handleFormData = (error: any, res: Response) => {
  res.status(400).json({
    success: false,
    message: error,
  });
};

const handleAuthTokenError = (error: any, res: Response) => {
  res.status(401).json({
    success: false,
    message: error.message,
  });
};

const customErrorHandler = function(error: any, res: Response) {
  res.status(error.status).json({
    success: false,
    message: error.message,
  });
};

export const handleError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.code && error.code == 11000) handleDuplicateKeyError(error, res);
  else if (error.name === 'CastError') handleCastError(error, res);
  else if (error.name === 'ValidationError') handleValidationError(error, res);
  else if (error.name === 'JsonWebTokenError') {
    error.message = 'Invalid token, Please login.';
    handleAuthTokenError(error, res);
  } else if (error.name === 'TokenExpiredError') {
    error.message = 'Token is expired, Please login first.';
    handleAuthTokenError(error, res);
  } else if (error.name === 'SyntaxError') handleInvalidJsonBody(error, res);
  else if (error.name === 'Custom Error') customErrorHandler(error, res);
  else handleUnknownError(error, res);
};

export const handle404Error = (req: Request, res: Response) => {
  Logger.error(`🔍 - Route Not Found: ${req.url}`);
  res.status(404).json({
    success: false,
    message: `🔍 - Route Not Found`,
    data: req.url,
  });
};
