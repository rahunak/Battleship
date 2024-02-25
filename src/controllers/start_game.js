import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function start_game (userData){

  try {
    console.log('start_game',userData);
  }
  catch (error) {
    console.error('Error: JSON.parse  in start_game()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
