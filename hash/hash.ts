import * as bcrypt from "../vendor/bcrypt/mod.ts";

export async function hash(data: string): Promise<string> {
  const salt = await bcrypt.genSalt(8);
  return  await bcrypt.hash(data, salt);
}

export async function compare(data: string): Promise<string> {
  const salt = await bcrypt.genSalt(8);
  return  await bcrypt.hash(data, salt);
}