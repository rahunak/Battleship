import process, { kill } from 'node:process';
import * as dotenv from 'dotenv';
import { httpServer } from './http_server/http_server.js';
import { wss as wsServer } from './ws_server/ws_server.js';
import {registration} from './controllers/registration.js';
import {parseRequest} from './helpers/parse_request.js';
import { webSocketsDb,usersDb,roomsDb,gamesDb } from './store/store.js';
import {add_user_to_room} from './controllers/add_user_to_room.js';
import {create_room} from './controllers/create_room.js';
import {create_game} from './controllers/create_game.js';
import {update_room} from './controllers/update_room.js';
import {start_game} from './controllers/start_game.js';
import {randomAttack} from './controllers/randomAttack.js';
import {turn} from './controllers/turn.js';
import {finish} from './controllers/finish.js';
import {add_ships} from './controllers/add_ships.js';
import {single_play} from './controllers/single_play.js';
import {attack} from './controllers/attack.js';
import {generate_new_entity} from './helpers/generate_new_entity.js';

dotenv.config();
let HTTP_PORT = process.env.HTTP_PORT ?? 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

httpServer.on('connection', (socket) => {
  socket.unref();
});

httpServer.on('close', (socket) => {
  console.log('httpServer closed',process.pid);
});

wsServer.on('connection', function (wsSoket) {
  console.log('wsServer new connection',process.pid);
  let userId = generate_new_entity('usersDb');
  // userId is also socket Id
  console.log(`User with id: ${userId} is connected`);

  wsSoket.on('message',(message,isBinary)=>{
    const msg = isBinary ? message.toString() : message;
    // console.log('message',JSON.parse(msg.toString(),null,4));
    const parsedData = parseRequest(msg.toString());
    if (parsedData.hasOwnProperty('error')){
      console.error('error in parse request message',msg);
      return;
    }
    else {
      // push in our store WebSocket entity.
      webSocketsDb[userId] = wsSoket;

      switch (parsedData.type) {
      case 'reg':
        registration(parsedData,userId);
        break;
      case 'create_room':
        create_room(parsedData,userId);
        break;
      case 'add_user_to_room':
        console.log('=======================================');
        add_user_to_room(parsedData,userId);
        break;
      case 'create_game':
        create_game(parsedData,userId);
        break;
      case 'update_room':
        update_room(parsedData,userId);
        break;
      case 'add_ships':
        add_ships(parsedData,userId);
        break;
      case 'start_game':
        start_game(parsedData,userId);
        break;
      case 'attack':
        attack(parsedData,userId);
        break;
      case 'randomAttack':
        randomAttack(parsedData,userId);
        break;
      case 'turn':
        turn(parsedData,userId);
        break;
      case 'finish':
        finish(parsedData,userId);
        break;
      case 'single_play':
        single_play(parsedData,userId);
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
