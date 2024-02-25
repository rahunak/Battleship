import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,gamesDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {create_game} from '../controllers/create_game.js';

export  function add_ships (parsedData,socketId){

  try {

    console.log('gamesDb', gamesDb);
    console.log('add_ships', parsedData);
    let {gameId, ships, indexPlayer} = parsedData.data;
    // gamesDb.set(gameId,{});
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
