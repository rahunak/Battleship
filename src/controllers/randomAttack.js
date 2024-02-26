import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function randomAttack (userData){

  try {
    console.log('randomAttack',userData);
  }
  catch (error) {
    console.error('Error: JSON.parse  in randomAttack()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
