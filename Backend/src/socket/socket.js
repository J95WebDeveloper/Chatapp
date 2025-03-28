import express from "express";
import http from "http";
import { Server } from "socket.io";


const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatapp-jtsp.onrender.com",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

// used to listen server side events
io.on("connection", (socket) => {
  console.log("User Connected :", socket.id);

  // get user id from client side
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log(users);
  }

  // send the events to all users
  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, server, io };
