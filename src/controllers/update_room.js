import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,usersDb,webSocketsDb } from '../store/store.js';


export  function update_room (){
//Нужно send rooms list, where only one player inside !!!
  try {
    let roomsWithOnePlayer = Array.from(roomsDb.values());
    console.log('roomsWithOnePlayer',roomsWithOnePlayer);
    // update info about rooms for all users
    let preparedResponse = generateResponse('update_room',roomsWithOnePlayer);

    Object.keys(webSocketsDb).forEach(id => {
      webSocketsDb[id].send(preparedResponse);
    });
  }
  catch (error) {
    console.error('Error: JSON.parse  in update_room()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
