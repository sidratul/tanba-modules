import * as yup from "https://cdn.skypack.dev/yup@0.32.9"
import { Context, HandlerFunc } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { TanbaContext } from "../context/mod.ts"

yup.setLocale({
  mixed:{
    notType: function notType(_ref : any) {
      const name = _ref.path === 'this'? 'data' : _ref.path;
      switch (_ref.type) {
        case 'number':
          return ` ${name} not a number`;
        case 'string':
          return `${name} not a string`;
        case 'object':
          return `${name} should not be a json object`;
        default:
          return 'Wrong type error';
      }
    }
  }
});

export default yup;

