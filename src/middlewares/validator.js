import {validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => {
      if (err.nestedErrors !== undefined) {
        err.nestedErrors.map((childErr) => {
          extractedErrors.push({
            param: childErr.param,
            message: childErr.msg
          });
        });
      } else {
        extractedErrors.push({
          param: err.param,
          message: err.msg
        });
      }
    });

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: extractedErrors
    })
  }

  next();
};

export default validator
