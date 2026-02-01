## 🔁 Client–Server Flow

The application follows a real-time client–server architecture using WebSockets.

### Drawing Flow
1. User draws on the canvas using mouse or touch.
2. Client captures coordinates using the Canvas API.
3. Client emits a `drawing_step` event with stroke data.
4. Server receives the stroke and stores it in global state.
5. Server broadcasts the stroke to all connected clients.
6. All clients render the stroke instantly.

This ensures real-time collaboration across multiple users.


## ↩️ Undo Logic (Per User)

Undo functionality is implemented on the server to maintain consistency.

### Steps:
1. User clicks the Undo button.
2. Client emits an `undo` event.
3. Server identifies the user using `socket.id`.
4. Server removes the last stroke created by that user.
5. Server emits `redraw_all` with updated stroke history.
6. Clients clear the canvas and redraw all strokes.

This approach prevents conflicts and ensures user-specific undo.


## 🔄 State Synchronization

The server maintains the global canvas state.

### How synchronization works:
- All strokes are stored on the server.
- When a new user connects, the server sends all previous strokes.
- On undo, the server sends the updated state to all clients.
- Clients redraw the canvas using the received state.

The server acts as the single source of truth, ensuring consistent canvas state across users.
