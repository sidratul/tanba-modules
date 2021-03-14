import { 
  HttpException, 
  BadRequestException,
  InternalServerErrorException, 
  createHttpExceptionBody,
  UnauthorizedException
} from "../vendor/abc/mod.ts";

import { Status } from "./status.ts"

export class InvalidTokenException extends HttpException {
  constructor(
    message?: string | Record<string, any> | any,
    error = "Invalid Token",
  ) {
    super(
      createHttpExceptionBody(message, error, Status.InvalidToken),
      Status.InvalidToken,
    );
  }
}

export const ExceptionHandler: Record<string,any> = {
  ValidationError: BadRequestException,
  
  /** jwt */
  RangeError: InvalidTokenException, /** expire jwt token */
  TypeError: UnauthorizedException, /**invalid jwt token */
}

export function ErrorHandler(e: Error){
  const Exception = ExceptionHandler[e.name] || InternalServerErrorException;
  throw new Exception(e.message);
}