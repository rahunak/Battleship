import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function attack (userData){

  try {
    console.log('attack',userData);
  }
  catch (error) {
    console.error('Error: JSON.parse  in attack()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
