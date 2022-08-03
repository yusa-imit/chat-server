import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getRooms } from "../db/util/getRooms";
import { insertRooms } from "../db/util/insertRooms";
import { v4 as uuidv4 } from "uuid";
import { RoomDocument } from "../type/Room";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
/**await insertRooms([
  { id: uuidv4(), name: "test" + uuidv4(), desc: "sample desc", users: [] },
]);*/
const rooms = await getRooms();
for (var room of rooms as RoomDocument[]) {
  console.log(`room object: {
    _id_toString : ${room._id.toString()},
    _id_timeStamp: ${room._id.getTimestamp()},
    _id_valueOf: ${room._id.valueOf()},
    id: ${room.id},
    name: ${room.name},
    desc: ${room.desc},
    users: ${room.users}
  }`);
}
export { app, server, io };
