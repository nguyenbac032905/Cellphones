import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import database from "./config/database";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./sockets/socket";

const port = Number(process.env.PORT);
//cau hình socket io
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3002","https://cellphones-tau.vercel.app"],
    credentials: true
  }
});
initSocket(io);


// connect DB
database();

// start server
server.listen(port, () => {
  console.log(`App listen on port ${port}`);
});