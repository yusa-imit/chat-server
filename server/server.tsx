import express from "express";
import http from "http";
import { Server } from "socket.io";
import { getChatHistory } from "../db/util/chatHistory/getChatHistory";
import { getRooms } from "../db/util/rooms/getRooms";
import { addTestChatHistory } from "../test/util/DB/addTestChatHistory";
import ReactDOMServer from "react-dom/server";
import React from "react";
import App from "../front/App";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
/**await insertRooms([
  { id: uuidv4(), name: "test" + uuidv4(), desc: "sample desc", users: [] },
]);*/

app.get("/", (req, res) => {
  ReactDOMServer.renderToPipeableStream(<App />).pipe(res);
});

const rooms = await getRooms({ logging: true });
for (const room of rooms) {
  //await addTestChatHistory(room.id);
  await getChatHistory(room.id, { logging: true });
}

export { app, server, io };
