import { Context} from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { JwtPayloadInterface } from "../jwt/mod.ts";

export class TanbaContext extends Context {
  user: JwtPayloadInterface;
  data: JSON;

  constructor(c: Context) {
    super(c);
    this.user = {} as JwtPayloadInterface;
    this.data = {} as JSON;
  }

  getUserId() {
    return this.user?._id;
  }

  hasUser() {
    return typeof this.user?._id !== "undefined";
  }

  getBody() {
    return this.data
  }

  setBody(data: JSON) {
    this.data = data;
  }

}