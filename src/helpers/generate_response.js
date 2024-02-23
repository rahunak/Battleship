export async function generateRenResponse (typeOfAction, responseData) {
  function innerStringify (comingData){
    try {
      return JSON.stringify(comingData);
    }
    catch (error) {
      console.error('Error: JSON.stringify in innerStringify()', error);
      return {error:'Error: JSON.stringify'};
    }
  }
  try {
    return JSON.stringify({ type:typeOfAction,data:innerStringify(responseData), id:0});
  }
  catch (error) {
    console.error('Error: JSON.stringify in generateRenResponse()', error);
    return {error:'Error: JSON.stringify'};
  }
}
