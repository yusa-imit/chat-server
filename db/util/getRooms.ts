import { client } from "../client";
import { DbConst } from "../../constants/DbConst";
export async function getRooms() {
  let r;
  try {
    await client.connect();
    const collection = client.db(DbConst.DB).collection(DbConst.ROOMS);
    const rooms = await collection.find().project({}).sort({}).toArray();
    r = rooms;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
  return r;
}
