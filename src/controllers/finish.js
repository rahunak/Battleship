import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function finish (userData){

  try {
    console.log('finish',userData);
  }
  catch (error) {
    console.error('Error: JSON.parse  in finish()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
