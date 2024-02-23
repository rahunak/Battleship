import * as dotenv from 'dotenv';
import { httpServer } from './http_server/http_server.js';
import { wss as wsServer } from './ws_server/ws_server.js';
import {registration} from './controllers/registration.js';
import {parseRequest} from './helpers/parse_request.js';

dotenv.config();
let HTTP_PORT = process.env.HTTP_PORT ?? 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

httpServer.on('connection', (socket) => {
  console.log('httpServer connection');
  socket.unref();
});

wsServer.on('connection', function (wsSoket) {
  console.log('wsServer new connection');

  wsSoket.on('message',(msg)=>{
    console.log('message',JSON.parse(msg,null,4));
    const parsedData = parseRequest(msg);
    console.log('parsedData',parsedData);
    if (parsedData.hasOwnProperty('error')){
      console.error('error is here');
    }else{
      registration(parsedData);
    }
  });

  wsSoket.on('close',()=>{
    console.log('close');
  });


});
