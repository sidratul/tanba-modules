import * as yup from "https://cdn.skypack.dev/yup@0.32.9"
import { Context, HandlerFunc } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { TanbaContext } from "../context/mod.ts"

export const validate = async (next:HandlerFunc, c:Context, schema: yup.ObjectSchema) =>{
  await schema.validate(c.body);
  const data = schema.cast(c.body) as JSON;
  const ct: TanbaContext = c.customContext();
  ct.setBody(data);
  return next(c);
}
