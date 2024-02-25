import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {create_game} from '../controllers/create_game.js';

export function create_room (parsedData){

  try {
    console.log('create_room', parsedData);
    let {id} = parsedData;
    //create_room
    roomsDb.push({
      type: 'create_room',
      data: '',
      id: generate_new_entity (roomsDb),
    });
    console.log('create_room', roomsDb);
    //create_game
    let answer = create_game(id);
    webSocketsDb[id].send(answer);
  }
  catch (error) {
    console.error('Error in create_room()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
