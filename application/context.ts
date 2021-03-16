import { Context } from "../vendor/abc/mod.ts";
import { UserPayload } from "../jwt/mod.ts";

export class TanbaContext extends Context {
  #user: UserPayload;
  #data: any;

  constructor(c: Context) {
    super(c);
    this.#user = {} as UserPayload;
    this.#data = {} as any;
  }

  set user(user: UserPayload){
    this.#user = user;
  }

  get user(){
    return this.#user;
  }

  get data(): any {
    return this.#data
  }

  set data(data: any){
    this.#data = data;
  }
}