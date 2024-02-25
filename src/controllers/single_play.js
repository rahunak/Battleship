import { generateResponse } from '../helpers/generate_response.js';
import { roomsDb,webSocketsDb } from '../store/store.js';

export async function single_play (socketId){

  try {

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

  }
  catch (error) {
    console.error('Error: JSON.parse  in single_play()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
