import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";
const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.adkovkz.mongodb.net/?retryWrites=true&w=majority`;

// Singleton design for db connection instance
abstract class Singleton {
  private static instance: MongoClient | undefined;
  static async getClient(): Promise<MongoClient> {
    if (this.instance) return this.instance as MongoClient;
    else {
      this.instance = await new MongoClient(uri, {
        serverApi: ServerApiVersion.v1,
      }).connect();
    }
    return this.instance;
  }
  static async closeClient() {
    await this.instance?.close();
  }
}

const client = await Singleton.getClient();
const closeConnection = Singleton.closeClient;

export { client, closeConnection };
