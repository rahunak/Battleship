import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {create_game} from '../controllers/create_game.js';

export async function add_ships (parsedData){

  try {
    console.log('add_ships', parsedData);
    let {id} = parsedData;
    //create_room
    roomsDb.push({add_ships:'add_ships'});

    let answer = await generateResponse('add_ships',{
      gameId: '<number | string>',
      ships:
        [
          {
            position: {
              x: '<number>',
              y: '<number>',
            },
            direction: '<boolean>',
            length: '<number>',
            type: '"small"|"medium"|"large"|"huge"',
          }
        ],
      indexPlayer: '<number | string>, /* id of the player in the current game session */'
    });

    webSocketsDb[id].send(answer);
  }
  catch (error) {
    console.error('Error in add_ships()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
