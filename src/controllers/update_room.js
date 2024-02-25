import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,webSocketsDb } from '../store/store.js';

export async function update_room (socketId){

  try {
    console.log('roomsDb',roomsDb);
    // let roomsWithOnePlayer = roomsDb.filter(room => room.data.players.length === 1);
/*
{
    type: "update_room",
    data:
        [
            {
                roomId: <number | string>,
                roomUsers:
                    [
                        {
                            name: <string>,
                            index: <number | string>,
                        }
                    ],
            },
        ],
    id: 0,
}
*/
    let answer = await generateResponse('update_room',[]);
    console.log('\n roomsDb',roomsDb);
    webSocketsDb[socketId].send(answer);
  }
  catch (error) {
    console.error('Error: JSON.parse  in update_room()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
