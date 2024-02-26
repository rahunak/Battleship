import { generateResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';
import {generate_new_entity} from '../helpers/generate_new_entity.js';
import {update_room} from '../controllers/update_room.js';
import {update_winners} from '../controllers/update_winners.js';

export  function registration (userData,userId){

  try {
    let {data} = userData;
    // id is socketId
    let doWeHaveUser = Array.from(usersDb.values()).some((user)=>{
      return user.name.trim() === data.name.trim() && user.password.trim() === data.password.trim();
    });

    if (doWeHaveUser){
      Array.from(usersDb.values()).find((user)=>{
        if (user.name.trim() === data.name.trim() && user.password.trim() === data.password.trim()){
          userId = user.id;
        }
      });
      let answer =  generateResponse('reg',{
        name: data.name,
        index:userId,
        error: true,
        errorText: 'User with the same name and password already exist.',
      });
      console.log('User with the same name and password already exist.');
      webSocketsDb[userId].send(answer);
    }
    else {


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
  }
  catch (error) {
    console.error('error in registration()', error);
    // generateResponse('reg','Error: JSON.parse');
  }
}
