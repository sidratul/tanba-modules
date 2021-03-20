import { HandlerFunc, Context } from "../vendor/abc/mod.ts";
import { TanbaContext } from "./context.ts"
import { ErrorHandler } from "./exception.ts"
import { decodeToken, UserPayload } from "../jwt/mod.ts"
import { normalizeError } from "../validation/zod.ts"

export function customContext(){
  return (next: HandlerFunc) =>
    (c: Context) => {
      const tc = new TanbaContext(c);
      return next(tc);
    }
}

export function validate(schema: any) {
  return (next: HandlerFunc) =>
    async (c: Context) => {
      let body = await c.body;
      let data:any;
      try{
        data = await schema.parseAsync(body);
      }catch(e){
        throw normalizeError(e);
      }

      const tc: TanbaContext = c.customContext;
      tc.data = data;
      return next(c);

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
      const ct: TanbaContext = c.customContext;
      ct.user = payload;

      return next(c);
    }
}