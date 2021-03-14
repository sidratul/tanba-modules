import { HandlerFunc, Context } from "../vendor/abc/mod.ts";
import yup, { ObjectData } from "../validation/mod.ts"
import { TanbaContext } from "../context/mod.ts"
import { ErrorHandler } from "./exception.ts"
import { decodeToken, UserPayload } from "../jwt/mod.ts"

export function customContext(){
  return (next: HandlerFunc) =>
    (c: Context) => {
      const tc = new TanbaContext(c);
      return next(tc);
    }
}

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
      const data = schema.cast(c.body) as ObjectData;
      const tc: TanbaContext = c.customContext();
      tc.data = data;
      return next(tc);
    }
}

export function error(){
  return (next: HandlerFunc) =>
    async (c: Context) => {
      try{
        return await next(c);
      } catch(e){
        return ErrorHandler(e);
      }
    }
}

export function auth(){
  return (next: HandlerFunc) =>
    async (c: Context) => {
      const autherization = c.request.headers.get('Authorization') || "" as string;
      const [bearer, token] = autherization.split(' ');
      const payload: UserPayload = await decodeToken(token);
      
      const ct: TanbaContext = c.customContext();
      ct.setUserPayload(payload);

      return next(c);
    }
}