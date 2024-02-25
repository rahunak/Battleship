import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,gamesDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {create_game} from '../controllers/create_game.js';

export  function add_ships (parsedData,socketId){

  try {

    console.log('gamesDb', gamesDb);
    console.log('add_ships', parsedData);
    let {gameId, ships, indexPlayer} = parsedData.data;
    // let answer =  generateResponse('add_ships',{
    //   gameId: '<number | string>',
    //   ships:
    //     [
    //       {
    //         position: {
    //           x: '<number>',
    //           y: '<number>',
    //         },
    //         direction: '<boolean>',
    //         length: '<number>',
    //         type: '"small"|"medium"|"large"|"huge"',
    //       }
    //     ],
    //   indexPlayer: '<number | string>, /* id of the player in the current game session */'
    // });

    webSocketsDb[socketId].send(generateResponse('start_game', {
      ships,
      currentPlayerIndex:indexPlayer,
    }));
  }
  catch (error) {
    console.error('Error in add_ships()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
