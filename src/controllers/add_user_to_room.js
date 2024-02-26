import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,roomsDb,gamesDb, webSocketsDb } from '../store/store.js';
import {create_game} from '../controllers/create_game.js';

export  function add_user_to_room (userData,socketId){

  try {
    let {indexRoom} = userData.data;
    if (roomsDb.get(indexRoom).roomUsers.some(user => user.index === socketId)){
      return;
    }
    if (!roomsDb.has(indexRoom)){
      roomsDb.set(indexRoom,
        {
          index:socketId,
          name:usersDb.get(socketId).name,
        }
      );
    }
    else {
      let waitingUsers = roomsDb.get(indexRoom);
      roomsDb.set(indexRoom,[...waitingUsers.roomUsers,{
        index:socketId,
        name:usersDb.get(socketId).name,
      }
      ]);

      Array.from(roomsDb.get(indexRoom)).forEach(player => {
        webSocketsDb[player.index].send(generateResponse('create_game',{
          idGame: indexRoom,
          idPlayer:player.index,
        }));
      });

    }


    // roomsDb.delete(data.indexRoom);
    // create_game('',socketId);
  }
  catch (error) {
    console.error('Error: JSON.parse  in add_user_to_room()', error);
    generateResponse('reg','Error: JSON.parse');
  }
}
