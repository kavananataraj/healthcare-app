const express = require("express");
const http = require("http"); 
const { Server } = require("socket.io"); 
const cors = require("cors");

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
    const bp = `${100 + Math.floor(Math.random() * 40)}/${60 + Math.floor(Math.random() * 30)}`;

    console.log("Sending:", heartRate, bp); // 👈 IMPORTANT DEBUG

    socket.emit("vitals", { heartRate, bp }); // 👈 IMPORTANT
  }, 2000);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});