import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,roomsDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {create_game} from '../controllers/create_game.js';
import {update_room} from '../controllers/update_room.js';

export function create_room (parsedData,userId){

  try {
    console.log('\n \n + create_room parsedData' , parsedData);
    console.log('create_room usersDb--', usersDb);
    console.log('create_room socketId', userId);
    if (usersDb.has(userId) === false){
      console.error('Error in create_room() usersDb.has(userId) returned false', error);
      return;
    }

    //create_room
    let roomId = generate_new_entity(roomsDb);
    roomsDb.set(roomId,{
      roomId: roomId,
      roomUsers: [{
        name:usersDb.get(userId).name,
        index:userId
      }],
    });

    //create_game
    // create_game(userId);
    console.log('create_room update_room');
    update_room ();


  }
  catch (error) {
    console.error('Error in create_room()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
