import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,roomsDb,webSocketsDb } from '../store/store.js';
import {create_game} from '../controllers/create_game.js';

export  function add_user_to_room (userData,userId){

  try {
    console.log('add_user_to_room',userData);
    let {data} = userData;
    console.log('add_user_to_room data',data);
    roomsDb[data.indexRoom];
    roomsDb.delete(data.indexRoom);
    // webSocketsDb[userId].send(generateResponse('create_game',data));
    create_game('',userId);
  }
  catch (error) {
    console.error('Error: JSON.parse  in add_user_to_room()', error);
    generateResponse('reg','Error: JSON.parse');
  }
}
