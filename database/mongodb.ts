import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";

const client = new MongoClient();
const Host = Deno.env.get('DB_HOST') || "tamba-cluster-shard-00-02.ywonz.mongodb.net";
const DbName = Deno.env.get('DB_NAME') || "tanba";
const UserName = Deno.env.get('DB_USER') || "sidratulmongo";
const Password = Deno.env.get('DB_PASS') || "";

// const uri = "mongodb+srv://sidratulmongo:7mgTSZK7aa9jpGDt@tamba-cluster.ywonz.mongodb.net/tanba?retryWrites=true&w=majority";
try{
  await client.connect({
    db: DbName,
    tls: false,
    servers: [
        {
          host: Host,
          port: 27017
        }
    ],
    credential: {
        username: UserName,
        password: Password,
        db: DbName,
        mechanism:'SCRAM-SHA-1'
    }
  });
} catch(e) {
  console.error("cannot connect database. please check host, username and password.");
  throw e;
}

const db = client.database(DbName);
export default db;