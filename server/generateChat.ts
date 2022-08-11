import { Long, Timestamp } from "mongodb";
import { Chat } from "../type/Chat";
import { User } from "../type/User";

export function generateChat(content: string, user: User): Chat {
  const now = new Timestamp(new Long(Date.now()));
  return {
    timestamp: now,
    content: content,
    by: user,
  };
}
