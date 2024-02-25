import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {update_room} from '../controllers/update_room.js';
import {update_winners} from '../controllers/update_winners.js';

export async function registration (userData){

  try {
    console.log('registration userData',userData);
    let {id,data} = userData;
    console.table([id,data.name,data.password]);
    let userId =  generate_new_entity(usersDb);
    usersDb.push({id:userId,name:data.name,password:data.password});

    let answer = await generateResponse('reg',{
      name: data.name,
      index:userId,
      error: false,
      errorText: '',
    });

    console.log('\nusersDb',usersDb);
    //reg
    webSocketsDb[id].send(answer);
    //update_rooms
    answer = await update_room(id);
    webSocketsDb[id].send(answer);
    //update_winners
    answer = await update_winners(id);
    webSocketsDb[id].send(answer);
  }
  catch (error) {
    console.error('error in registration()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
