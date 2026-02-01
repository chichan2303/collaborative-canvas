const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ IMPORTANT: Serve client folder
app.use(express.static(path.join(__dirname, "../client")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("drawing_step", (data) => {
    socket.broadcast.emit("drawing_step", data);
  });

  socket.on("undo", () => {
    io.emit("redraw_all");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});



