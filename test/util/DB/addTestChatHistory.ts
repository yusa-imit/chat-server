import { Long, Timestamp } from "mongodb";
import { client } from "../../../db/client";
import { Chat } from "../../../type/Chat";
import { DbConst } from "../../../constants/DbConst";

const now = new Timestamp(new Long(Date.now()));
const chatHistoryData: Chat[] = [
  {
    timestamp: now,
    content: "test_message_2",
    by: {
      id: "test_user_id_2",
      profileImage: "test_user_profile_image_2",
      name: "test_user_id_2",
    },
  },
];

export async function addTestChatHistory(
  roomId: string,
  chatData: Chat[] = chatHistoryData
) {
  try {
    await client.connect();
    await client
      .db(DbConst.HISTORY.name)
      .collection(roomId)
      .insertMany(chatData);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
