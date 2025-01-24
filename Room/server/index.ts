import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server, LobbyRoom } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import { RoomType } from '../types/Rooms';

// Import your room class
import { SkyOffice } from './rooms/SkyOffice';

const port = Number(process.env.PORT || 2567);
const app = express();

// Middleware for CORS and JSON
app.use(cors());
app.use(express.json());

// Add a default route to handle GET requests to "/"
app.get('/', (req, res) => {
  res.send('Backend is running! This server only accepts WebSocket connections.');
});

// Create HTTP and game server
const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// Register room handlers
gameServer.define(RoomType.LOBBY, LobbyRoom); // Colyseus default lobby
gameServer.define(RoomType.PUBLIC, SkyOffice, {
  name: 'Lancers Hub',
  description: 'Welcome back to your office!',
  password: null,
  autoDispose: true, // Keep the room alive until manually disposed
});

// Enable the Colyseus monitor (useful for debugging and monitoring game rooms)
app.use('/colyseus', monitor());

// Start the game server
gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
