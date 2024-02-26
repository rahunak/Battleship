import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export  function update_winners (){

  try {
    let users = Array.from(usersDb.values());

    let answer =  generateResponse('update_winners',[]);

    Object.keys(webSocketsDb).forEach(id => {
      webSocketsDb[id].send(answer);
    });
  }
  catch (error) {
    console.error('Error: JSON.parse  in update_winners()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
