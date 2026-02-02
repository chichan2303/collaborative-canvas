const userStrokes = new Map();

export function addStroke(userId, stroke) {
  if (!userStrokes.has(userId)) {
    userStrokes.set(userId, []);
  }
  userStrokes.get(userId).push(stroke);
}

export function undoStroke(userId) {
  if (!userStrokes.has(userId)) return;
  userStrokes.get(userId).pop();
}

export function getAllStrokes() {
  let all = [];
  for (let strokes of userStrokes.values()) {
    all = all.concat(strokes);
  }
  return all;
}
