import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import yup from "../validation/mod.ts"
import { TanbaContext } from "../context/mod.ts"
import { ErrorHandler } from "./exception.ts"

export function validate(schema: yup.ObjectSchema, withParams = false) {
  return (next: HandlerFunc) =>
    async (c: Context) => {
      let body = await c.body;
      if( withParams ) {
        body = {
          ...body as Record<string,unknown>,
          ...c.params,
        }
      }
      const res = await schema.validate(body);
      const data = schema.cast(c.body) as JSON;
      const ct: TanbaContext = c.customContext();
      ct.setBody(data);
      return next(c);
    }
}

export function customContext(){
  return (next: HandlerFunc) =>
    (c: Context) => {
      const tc = new TanbaContext(c);
      return next(tc);
    }
}

export function error(){
  return (next: HandlerFunc) =>
    async (c: Context) => {
      try{
        await next(c);
      } catch(e){
        return ErrorHandler(e);
      }
    }
  
}