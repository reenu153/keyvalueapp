import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";

/**
 * This exception can use used in case an entity is not found.
 */
class IncorrectUsernameOrPasswordException extends HttpException {

  constructor(error: CustomError) {
    super(400, error.MESSAGE, error.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;