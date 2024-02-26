import { WebSocketServer } from 'ws';
let WS_PORT = process.env.WS_PORT ?? 3000;
export const wss = new WebSocketServer({ port: WS_PORT });
console.log('This WebSocket server is runing on ws://localhost:'+WS_PORT);
