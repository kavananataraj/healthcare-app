const express = require("express");
const http = require("http");
const cors = require("cors"); 
const { Server } = require("socket.io");

const app = express(); 
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  setInterval(() => {
    const heartRate = Math.floor(Math.random() * 80) + 60;
    const bp = `${100 + Math.floor(Math.random() * 40)}/${60 + Math.floor(Math.random() * 20)}`;

    console.log("Sending:", heartRate, bp); // 👈 IMPORTANT

    socket.emit("vitals", { heartRate, bp });
  }, 2000);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});