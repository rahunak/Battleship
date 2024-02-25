import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {update_room} from '../controllers/update_room.js';
import {update_winners} from '../controllers/update_winners.js';

export  function registration (userData,userId){

  try {
    console.log('registration userData',userData,'userId',userId);
    let {data} = userData;
    // id is socketId
    usersDb.set( userId , {id:userId,name:data.name,password:data.password});
    let answer =  generateResponse('reg',{
      name: data.name,
      index:userId,
      error: false,
      errorText: '',
    });

    //reg
    webSocketsDb[userId].send(answer);
    //update_rooms
    update_room();
    //update_winners
    update_winners();

  }
  catch (error) {
    console.error('error in registration()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
