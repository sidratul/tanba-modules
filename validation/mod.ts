import * as yup from "../vendor/yup/mod.ts"
import { Context, HandlerFunc } from "../vendor/abc/mod.ts";
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

export interface ObjectData {
  [key: string]: unknown;
}

export default yup;

