import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";
const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.adkovkz.mongodb.net/?retryWrites=true&w=majority`;

// Singleton design for db connection instance
abstract class Singleton {
  private static instance: MongoClient | undefined;
  constructor() {
    throw new Error(
      "You cannot add instance of singleton object, do not try to extend or implements this abstract class."
    );
  }
  static async getClient(): Promise<MongoClient> {
    if (this.instance) return this.instance as MongoClient;
    else {
      try {
        this.instance = await new MongoClient(uri, {
          serverApi: ServerApiVersion.v1,
        }).connect();
      } catch (e) {
        console.error(e);
        throw new Error(
          "Could not start DB instance. Check DB settings or restart server."
        );
      } finally {
        console.log("DB connection made successfully.");
      }
    }
    return this.instance;
  }
  static async closeClient() {
    if (!this.instance) {
      console.log("Any DB instance was made before. DB disconnect confirmed.");
      return;
    }
    try {
      await this.instance.close();
    } catch (e) {
      console.log(
        "Unidentified error occured, but this error can be ignored. Check error message below."
      );
      console.error(e);
      return;
    } finally {
      console.log("DB disconnect confirmed");
    }
  }
}

const client = await Singleton.getClient();
const closeConnection = Singleton.closeClient;

export { client, closeConnection };
