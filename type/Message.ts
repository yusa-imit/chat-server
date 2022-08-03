import { Timestamp } from "mongodb";
import { User } from "./User";

export interface Message {
  timestamp: Timestamp;
  content: string;
  by: User;
}
