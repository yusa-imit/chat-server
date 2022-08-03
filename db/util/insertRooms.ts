import { Room } from "../../type/Room";
import { client } from "../client";
import { DbConst } from "../../constants/DbConst";

export async function insertRooms(rooms: Room[]) {
  try {
    await client.connect();
    await client.db(DbConst.DB).collection(DbConst.ROOMS).insertMany(rooms);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}