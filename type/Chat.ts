import { ObjectId, Timestamp } from "mongodb";
import { User } from "./User";

export interface Chat {
  timestamp: Timestamp;
  content: string;
  by: User;
}

export interface ChatDocument extends Chat {
  _id: ObjectId;
}
