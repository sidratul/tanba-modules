import { create, Payload } from "https://deno.land/x/djwt@v2.2/mod.ts"

export interface JwtPayloadInterface extends Payload{
  _id?: { $oid: string };
  username: string;
}

export const GenerateToken = async (payload: JwtPayloadInterface) : Promise<string> => {
  return await create({ alg: "HS512", typ: "JWT" }, payload , Deno.env.get('APP_SECRET') || "jwtsecret");
}
