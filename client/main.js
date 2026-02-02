const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const socket = io(); // IMPORTANT: no URL here

let drawing = false;
let prev = null;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  prev = { x: e.offsetX, y: e.offsetY };
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  prev = null;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const curr = { x: e.offsetX, y: e.offsetY };

  drawLine(prev, curr);
  socket.emit("drawing_step", { prev, curr });

  prev = curr;
});

socket.on("drawing_step", ({ prev, curr }) => {
  drawLine(prev, curr);
});

function drawLine(p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}
