import { usersDb,roomsDb,gamesDb,webSocketsDb } from '../store/store.js';

let enumCouner = {
  usersDb: 0,
  roomsDb: 0,
  gamesDb: 0,
  webSocketsDb: 0,
};

export function generate_new_entity (entityType) {

  try {
    return ++enumCouner[entityType.toString()];
  }
  catch (error) {
    console.error('Error in generate_new_entity()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
