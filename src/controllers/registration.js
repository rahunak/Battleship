import { generateRenResponse } from '../helpers/generate_response.js';
import { usersDb,webSocketsDb } from '../store/store.js';

export async function registration (userData){

  try {
    console.log('userData',userData);
    let {id,data} = userData;
    console.table([id,data.name,data.password]);

    usersDb.push({id,name:data.name,password:data.password});

    let answer = await generateRenResponse('reg',{
      name: data.name,
      index: id,
      error: false,
      errorText: '',
    });
    console.log('\n\nanswer',answer);
    webSocketsDb[id].send(answer);

  }
  catch (error) {
    console.error('Error: JSON.parse  in registration()', error);
    generateRenResponse('reg','Error: JSON.parse');
  }
}
