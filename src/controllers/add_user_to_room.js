import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,roomsDb,gamesDb, webSocketsDb } from '../store/store.js';
import {create_game} from '../controllers/create_game.js';

export  function add_user_to_room (userData,userId){

  try {
    console.log('add_user_to_room',userData,'userId',userId);
    let {indexRoom} = userData.data;
    if (!gamesDb.has(indexRoom)){
      gamesDb.set(indexRoom,[
        {
          userId,
          userName:usersDb.get(userId).name,
        }
      ]
      );
    }
    else {
      let waitingUsers = gamesDb.get(indexRoom);
      console.log('waitingUsers',waitingUsers);
      gamesDb.set(indexRoom,[...waitingUsers,{
        userId,
        userName:usersDb.get(userId).name,
      }
      ]);
      gamesDb.get(indexRoom).forEach(player => {
        webSocketsDb[player.userId].send(generateResponse('create_game',{
          idGame: indexRoom,
          idPlayer:userId,
        }));
      });

    }

    console.log('add_user_to_room gamesDb',gamesDb.get(indexRoom));
    // roomsDb.delete(data.indexRoom);
    // create_game('',userId);
  }
  catch (error) {
    console.error('Error: JSON.parse  in add_user_to_room()', error);
    generateResponse('reg','Error: JSON.parse');
  }
}
