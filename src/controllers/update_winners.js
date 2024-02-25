import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function update_winners (socketId){

  try {
    console.log('update_winners',socketId);
/**
 * {
    type: "update_winners",
    data:
        [
            {
                name: <string>,
                wins: <number>,
            }
        ],
    id: 0,
}
 */

    let answer = await generateResponse('update_winners',[]);
    console.log('\n update_winners',usersDb);
    webSocketsDb[socketId].send(answer);
  }
  catch (error) {
    console.error('Error: JSON.parse  in update_winners()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
