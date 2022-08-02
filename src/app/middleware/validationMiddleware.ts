import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request } from "express";
import * as express from "express";
import HttpException from "../exception/HttpException";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";


/**
 * Middleware to validate the request.
 * Validations are performed using class validator
 */
function validationMiddleware<T>(type: any, parameter: string, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    let req_struct
    switch(parameter)
    {
        case APP_CONSTANTS.body:   req_struct=req.body;
                                   break;
    
        case APP_CONSTANTS.params: req_struct=req.params;
                                   break;
    }

    const requestBody = plainToClass(type, req_struct);
    validate(
      requestBody, { skipMissingProperties, forbidUnknownValues: true, whitelist: true })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorDetail = ErrorCodes.VALIDATION_ERROR;
          next(errors);
        } else {
            if(parameter==='body')
            req.body = requestBody;
          next();
        }
      });
  };
}
export default validationMiddleware;