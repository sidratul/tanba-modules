import { Application } from "../vendor/abc/mod.ts";
import { customContext, error } from "./middleware.ts"

export const app = new Application();

app.pre(customContext());
app.pre(error());