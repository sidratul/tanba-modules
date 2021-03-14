import { Application } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { customContext, error } from "./middleware.ts"

export const app = new Application();

app.pre(customContext());
app.pre(error());