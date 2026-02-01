import { canvas, ctx, getCanvasCoordinates } from "./canvas.js";
import { socket } from "./websocket.js";

let drawing = false;
let prevPos = null;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  prevPos = getCanvasCoordinates(e);
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const pos = getCanvasCoordinates(e);

  ctx.beginPath();
  ctx.moveTo(prevPos.x, prevPos.y);
  canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const pos = getCanvasCoordinates(e);

  const stroke = {
    userId: socket.id,
    start: prevPos,
    end: pos,
    color: "#000",
    width: 4
  };

  socket.emit("drawing_step", stroke);

  prevPos = pos;
});


  prevPos = pos;
});

canvas.addEventListener("mouseup", () => drawing = false);

document.getElementById("undoBtn")
  .addEventListener("click", () => {
    socket.emit("undo");
  });
