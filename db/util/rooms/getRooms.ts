import { DbConst } from "../../../constants/DbConst";
import { RoomDocument } from "../../../type/Room";
import { client } from "../../client";
import { logRoomDocuments } from "../../log/logRoomDocuments";

interface getRoomsOption {
  logging?: boolean;
}

export async function getRooms(options?: getRoomsOption) {
  let r: RoomDocument[];
  try {
    await client.connect();
    const collection = client
      .db(DbConst.META.name)
      .collection(DbConst.META.collections.ROOMS);
    const rooms = await collection.find().project({}).sort({}).toArray();
    r = rooms as RoomDocument[];
  } catch (error) {
    console.warn(
      "Cannot connected to db or cannot execute db transactions. See details from the error message below."
    );
    console.error(error);
    r = [];
  } finally {
    await client.close();
  }
  if (options?.logging) {
    logRoomDocuments(r);
  }
  return r;
}
