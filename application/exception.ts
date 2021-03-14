import { 
  HttpException, 
  BadRequestException,
  InternalServerErrorException 
} from "https://deno.land/x/abc@v1.3.0/mod.ts";

export const ExceptionHandler: Record<string,any> = {
  ValidationError: BadRequestException,
}

export function ErrorHandler(e: Error){
  const Exception = ExceptionHandler[e.name] || InternalServerErrorException;
  throw new Exception(e.message);
}