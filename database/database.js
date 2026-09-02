import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import path from "path";
import dns from "dns";

dns.setServers(["1.1.1.1"]);

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);
dotenv.config({
  path: path.join(currentDirectory, ".env"),
  override: true,
});
const URI = process.env.MONGODB_URI;

if (!URI) {
  throw new Error("MONGODB_URI is missing from database/.env");
}

// mongodb 
const client = new MongoClient(URI);
// console.log(client);
async function main() {
  try{
    await client.connect();
    const database=client.db("Bhabesh_demo");
    const users= database.collection('users');
    const query = { firstname: 'Bhabesh' };
    const user = await users.findOne(query);
    console.log("user ----",user);
  }finally {
    await client.close();
  }
}
main().catch(console.error)