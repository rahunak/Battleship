import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,gamesDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {create_game} from '../controllers/create_game.js';

export  function add_ships (parsedData,socketId){

  try {

    console.log('add_ships socketId', socketId);
    console.log('add_ships', parsedData);
    let {gameId, ships, indexPlayer} = parsedData.data;
 console.log('gamesDb', gamesDb);
  console.log('\n \n ==>roomsDb', roomsDb.get(1).roomUsers);
    if (gamesDb.has(gameId)) {

      let gameData = gamesDb.get(gameId);

      console.log('gameData=========>',gameData);
      gamesDb.set(gameId,[...gameData,{
        gameId,
        ships,
        indexPlayer
      }]);

      gamesDb.get(gameId).forEach(player => {
        // console.log('forEach player',player);
        // console.log('\n \n \n forEach webSocketsDb[player.userId]',webSocketsDb[player.userId]);
        // webSocketsDb[player.userId].send(generateResponse('start_game', {
        //   ships,
        //   currentPlayerIndex:indexPlayer,
        // }));
      });
    }
    else {
      gamesDb.set(gameId,[{
        gameId,
        ships,
        indexPlayer
      }]);
    }

    //Только после того как 2-а игрока добавят корабли к 1-йкомнате
    // webSocketsDb[socketId].send(generateResponse('start_game', {
    //   ships,
    //   currentPlayerIndex:indexPlayer,
    // }));
  }
  catch (error) {
    console.error('Error in add_ships()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
