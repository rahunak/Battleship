import { httpServer } from './src/http_server/index.js';
import * as dotenv from 'dotenv';

dotenv.config();
let HTTP_PORT = process.env.HTTP_PORT ?? 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

httpServer.on('connection', (socket) => {
  console.log('httpServer connection');
  socket.unref();
});
