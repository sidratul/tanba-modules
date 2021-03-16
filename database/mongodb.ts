import { MongoClient } from "../vendor/mongo/mod.ts";
export * from "../vendor/mongo/mod.ts"

const Host = Deno.env.get('DB_HOST') || "127.0.0.1";
const DbName = Deno.env.get('DB_NAME') || "tanba";
const UserName = Deno.env.get('DB_USER') || "tanbamongo";
const Password = Deno.env.get('DB_PASS') || "";

// CANNOT CONNECT. 
// const uri = "mongodb+srv://sidratulmongo:7mgTSZK7aa9jpGDt@tamba-cluster.ywonz.mongodb.net/tanba?retryWrites=true&w=majority";
// try{
//   await client.connect({
//     db: DbName,
//     tls: false,
//     servers: [
//         {
//           host: Host,
//           port: 27017
//         }
//     ],
//     credential: {
//         username: UserName,
//         password: Password,
//         db: DbName,
//         mechanism:'SCRAM-SHA-1'
//     }
//   });
// } catch(e) {
//   console.error("cannot connect database. please check host, username and password.");
//   throw e;
// }

const client = new MongoClient();
await client.connect("mongodb://localhost:27017");

const db = client.database(DbName);
export default db;