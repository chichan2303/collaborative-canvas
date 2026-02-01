export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.globalAlpha = 0.95;

export function getCanvasCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
  };
}

export function drawStroke(stroke) {
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.width;

  ctx.beginPath();
  ctx.moveTo(stroke.start.x, stroke.start.y);
  ctx.lineTo(stroke.end.x, stroke.end.y);
  ctx.stroke();
}

export function redrawCanvas(strokes) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  strokes.forEach(drawStroke);
}
