import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,gamesDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';

export  function create_game (parsedData, userId){

  try {

    console.log('\n\n +  create_game userId',userId);
    let gameId = generate_new_entity('gamesDb');
    gamesDb.set(gameId, {
      idGame: gameId,
      idPlayer: userId,
    });
    let answer =  generateResponse('create_game',{
      idGame: gameId,
      idPlayer:userId,
    });

    //reg
    webSocketsDb[userId].send(answer);

  }
  catch (error) {
    console.error('Error: JSON.parse  in create_game()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
