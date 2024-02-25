import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,roomsDb,gamesDb, webSocketsDb } from '../store/store.js';
import {create_game} from '../controllers/create_game.js';

export  function add_user_to_room (userData,socketId){

  try {
    console.log('+++++++++++++++++ add_user_to_room',userData,'socketId',socketId);
    let {indexRoom} = userData.data;
    console.log('===============roomsDb',roomsDb.get(indexRoom));
    if (roomsDb.get(indexRoom).roomUsers.some(user => user.index === socketId)){
      console.log('you already in this room');
      //needimplement check on adding the same user to one room
    }
    if (!gamesDb.has(indexRoom)){
      gamesDb.set(indexRoom,[
        {
          socketId,
          userName:usersDb.get(socketId).name,
        }
      ]
      );
    }
    else {
      let waitingUsers = gamesDb.get(indexRoom);
      console.log('waitingUsers',waitingUsers);
      gamesDb.set(indexRoom,[...waitingUsers,{
        socketId,
        userName:usersDb.get(socketId).name,
      }
      ]);
      gamesDb.get(indexRoom).forEach(player => {
        webSocketsDb[player.socketId].send(generateResponse('create_game',{
          idGame: indexRoom,
          idPlayer:socketId,
        }));
      });

    }

    console.log('add_user_to_room gamesDb',gamesDb.get(indexRoom));
    // roomsDb.delete(data.indexRoom);
    // create_game('',socketId);
  }
  catch (error) {
    console.error('Error: JSON.parse  in add_user_to_room()', error);
    generateResponse('reg','Error: JSON.parse');
  }
}
