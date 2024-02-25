import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function add_user_to_room (userData){

  try {
    console.log('add_user_to_room',userData);
    let {indexRoom} = userData;

  }
  catch (error) {
    console.error('Error: JSON.parse  in registration()', error);
    generateResponse('reg','Error: JSON.parse');
  }
}
