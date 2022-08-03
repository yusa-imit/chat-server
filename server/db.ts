import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.adkovkz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
client.connect((error) => {
  console.error(error);
  client.close();
});

export { client as db_client };
