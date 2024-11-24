import { createWSServer } from './wsServer';

const port = parseInt(process.env.WS_PORT || '3001', 10);
createWSServer(port);
console.log(`✅ WebSocket Server listening on ws://localhost:${port}`);
