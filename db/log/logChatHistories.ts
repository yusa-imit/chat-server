import { ChatDocument } from "../../type/Chat";

export function logChatHistories(chatHistory: ChatDocument[]) {
  for (const chat of chatHistory) {
    console.log(`Chat Object: {
      _id: {
        _id_timestamp: ${chat._id.getTimestamp()}
        _id_toString: ${chat._id.toString()}
      },
      by: {
        id: ${chat.by.id},
        name: ${chat.by.name},
        profileImage: ${chat.by.profileImage}
      }
      content: ${chat.content};
      timestamp: ${chat.timestamp}
    }`);
  }
}
