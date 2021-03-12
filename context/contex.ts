import { Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";

export class TambaContext extends Context {
  constructor(c: Context) {
    super(c);
  }

  hello() {
    console.log(this.url);
  }
}