import { Context, } from "../vendor/abc/mod.ts";
import { UserPayload } from "../jwt/mod.ts";

export class TanbaContext extends Context {
  user: UserPayload;
  data: JSON;

  constructor(c: Context) {
    super(c);
    this.user = {} as UserPayload;
    this.data = {} as JSON;
  }

  setUserPayload(user: UserPayload){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  getUserId() {
    return this.user?._id;
  }

  getBody() {
    return this.data
  }

  setBody(data: JSON) {
    this.data = data;
  }
}