import { generateRenResponse } from '../helpers/generate_response.js';
import { store } from '../store/store.js';

export function registration (userData){

  try {
    console.log('userData',userData);
    let {id,data} = userData;
    console.table([id,data.name,data.password]);

    store.users.push({id,name:data.name,password:data.password});

    console.log('store ',store);
  } catch (error) {
    console.error('Error: JSON.parse  in registration()', error);
    generateRenResponse('reg','Error: JSON.parse');
  }
}
