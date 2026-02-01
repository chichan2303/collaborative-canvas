import { drawStroke, redrawCanvas } from "./canvas.js";

export const socket = io();

socket.on("drawing_step", drawStroke);

socket.on("redraw_all", (strokes) => {
  redrawCanvas(strokes);
});
