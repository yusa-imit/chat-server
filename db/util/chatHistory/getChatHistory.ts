import { client } from "../../client";
import { DbConst } from "../../../constants/DbConst";
import { RoomDocument } from "../../../type/Room";
import { logRoomDocuments } from "../../log/logRoomDocuments";
import { ChatDocument } from "../../../type/Chat";
import { logChatHistories } from "../../log/logChatHistories";

interface getChatHistoryOption {
  lastIndex?: number;
  number?: number;
  logging?: boolean;
}

export async function getChatHistory(
  roomId: string,
  options?: getChatHistoryOption
) {
  let r: ChatDocument[];
  try {
    await client.connect();
    const collection = client.db(DbConst.HISTORY.name).collection(roomId);
    const rooms = await collection.find().project({}).sort({}).toArray();
    r = rooms as ChatDocument[];
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
    logChatHistories(r);
  }
  return r;
}
