import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function turn (userData){

  try {
    console.log('turn',userData);
  }
  catch (error) {
    console.error('Error: JSON.parse  in turn()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
