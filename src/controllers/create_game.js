import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function create_game (socketId){

  try {
    console.log('create_game',);

    let answer = await generateResponse('create_game',{
      idGame: 'idGame- testNumberOrStr',
      idPlayer:'idPlayer- testNumberOrStr',
    });

    console.log('\nusersDb',usersDb);
    //reg
    webSocketsDb[socketId].send(answer);

  }
  catch (error) {
    console.error('Error: JSON.parse  in create_game()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
