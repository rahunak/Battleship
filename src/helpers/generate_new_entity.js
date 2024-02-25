import { usersDb,roomsDb,gamesDb } from '../store/store.js';
export function generate_new_entity (entityType) {

  try {
    return entityType.size +1;
  }
  catch (error) {
    console.error('Error in generate_new_entity()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
