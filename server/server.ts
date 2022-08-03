import express from "express";
import http from "http";
import { Server } from "socket.io";
import { db_client } from "./db";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

export { app, server, io };
