import { Context } from "../vendor/abc/mod.ts";
import { ObjectData } from "../validation/mod.ts"
import { UserPayload, generateToken } from "../jwt/mod.ts";

export class TanbaContext extends Context {
  user: UserPayload;
  #data: ObjectData;

  constructor(c: Context) {
    super(c);
    this.user = {} as UserPayload;
    this.#data = {} as ObjectData;
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

  get data(): ObjectData {
    return this.#data
  }

  set data(data: ObjectData){
    this.#data = data;
  }
}