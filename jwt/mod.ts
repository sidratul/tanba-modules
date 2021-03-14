import { create, Payload, verify, getNumericDate } from "https://deno.land/x/djwt@v2.2/mod.ts"

export interface UserPayload extends Payload{
  _id?: { $oid: string };
  username: string;
}

const Secret = Deno.env.get('APP_SECRET') || "jwtsecret";

export async function generateToken(payload: UserPayload | Payload, expire= 3600) : Promise<string> {
  payload.exp = getNumericDate(expire);
  return await create({ alg: "HS512", typ: "JWT" }, payload , Secret );
}

export async function decodeToken(token: string) : Promise<UserPayload>{
  return await verify(token, Secret, "HS512") as UserPayload;
}