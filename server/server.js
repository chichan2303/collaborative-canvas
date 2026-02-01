const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

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
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});


