import { ObjectId } from "mongodb";

export interface Room {
  id: string;
  name: string;
  desc: string;
  users: string[];
}

export interface RoomDocument extends Room {
  _id: ObjectId;
}
