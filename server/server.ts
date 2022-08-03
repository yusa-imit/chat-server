import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getRooms } from "../db/util/getRooms";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
/**await insertRooms([
  { id: uuidv4(), name: "test" + uuidv4(), desc: "sample desc", users: [] },
]);*/
const rooms = await getRooms({ logging: true });
export { app, server, io };
