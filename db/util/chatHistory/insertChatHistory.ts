import { client } from "../../client";
import { DbConst } from "../../../constants/DbConst";
import { Chat, ChatDocument } from "../../../type/Chat";

interface getChatHistoryOption {
  lastIndex?: number;
  number?: number;
  logging?: boolean;
}

export async function insertChatHistory(
  roomId: string,
  chat: Chat[],
  options?: getChatHistoryOption
) {
  try {
    await client.connect();
    await client.db(DbConst.HISTORY.name).collection(roomId).insertMany(chat);
  } catch (error) {
    console.warn(
      "Cannot connected to db or cannot execute db transactions. See details from the error message below."
    );
    console.error(error);
  } finally {
    await client.close();
  }
  if (options?.logging) {
  }
}
