const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { strokes, addStroke, undoLastStroke } = require("./state-manager");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("client"));

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.emit("init_canvas", strokes);

  socket.on("drawing_step", (stroke) => {
    addStroke(stroke);
    socket.broadcast.emit("drawing_step", stroke);

  socket.on("undo", () => {
  const updatedStrokes = undoLastStroke(socket.id);
  io.emit("redraw_all", updatedStrokes);
});

  });

  socket.on("undo", () => {
    const updated = undoLastStroke(socket.id);
    io.emit("redraw_all", updated);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

