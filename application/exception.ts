import { 
  HttpException, 
  BadRequestException,
  InternalServerErrorException, 
  createHttpExceptionBody,
  UnauthorizedException
} from "../vendor/abc/mod.ts";

import { Status } from "./status.ts"

export class AppError extends Error {
  constructor(name: string, ...params:any[]) {
    super(...params);
    this.name = name
  }
}

export class JwtError extends AppError{
  constructor(message: string) {
    super("JwtError",message);
  }
}

export class ValidationError extends AppError{
  constructor(message: string) {
    super("ValidationError",message);
  }
}

export const ExceptionHandler: Record<string,any> = {
  ValidationError: BadRequestException,
  JwtError: UnauthorizedException, 
}

export function ErrorHandler(e: Error){
  const Exception = ExceptionHandler[e.name] || InternalServerErrorException;
  throw new Exception(e.message);
}