import process, { kill } from 'node:process';
import * as dotenv from 'dotenv';
import { httpServer } from './http_server/http_server.js';
import { wss as wsServer } from './ws_server/ws_server.js';
import {registration} from './controllers/registration.js';
import {parseRequest} from './helpers/parse_request.js';
import { webSocketsDb } from './store/store.js';
import {add_user_to_room} from './controllers/add_user_to_room.js';
import {create_room} from './controllers/create_room.js';
import {create_game} from './controllers/create_game.js';
import {update_room} from './controllers/update_room.js';
import {start_game} from './controllers/start_game.js';
import {randomAttack} from './controllers/randomAttack.js';
import {turn} from './controllers/turn.js';
import {finish} from './controllers/finish.js';
import {add_ships} from './controllers/add_ships.js';

dotenv.config();
let HTTP_PORT = process.env.HTTP_PORT ?? 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

httpServer.on('connection', (socket) => {
  console.log('httpServer connection',process.pid);
  socket.unref();
});

httpServer.on('close', (socket) => {
  console.log('httpServer closed',process.pid);
});

wsServer.on('connection', function (wsSoket) {
  console.log('wsServer new connection',process.pid);

  wsSoket.on('message',(msg)=>{
    console.log('message',JSON.parse(msg,null,4));
    const parsedData = parseRequest(msg);
    if (parsedData.hasOwnProperty('error')){
      console.error('error in parse request message',msg);
      return;
    }
    else {
      console.log('parsedData',parsedData);
      // push in our store WebSocket entity.
      webSocketsDb[parsedData.id] = wsSoket;

      switch (parsedData.type) {
      case 'reg':
        registration(parsedData);
        break;
      case 'create_room':
        create_room(parsedData);
        break;
      case 'add_user_to_room':
        add_user_to_room(parsedData);
        break;
      case 'create_game':
        create_game(parsedData);
        break;
      case 'update_room':
        update_room(parsedData);
        break;
      case 'add_ships':
        add_ships(parsedData);
        break;
      case 'start_game':
        start_game(parsedData);
        break;
      case 'attack':
        attack(parsedData);
        break;
      case 'randomAttack':
        randomAttack(parsedData);
        break;
      case 'turn':
        turn(parsedData);
        break;
      case 'finish':
        finish(parsedData);
        break;
      default:
        console.error('uncknown command type:',parsedData.type);
        break;
      }

    }
  });

  wsSoket.on('close',(e)=>{
    wsSoket.close();
  });


});


process.on('SIGINT',()=>{
  console.log('SIGINT kill process id:',process.pid);
  kill(process.pid);
});
