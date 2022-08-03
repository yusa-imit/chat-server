import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";
const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.adkovkz.mongodb.net/?retryWrites=true&w=majority`;
export const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});
