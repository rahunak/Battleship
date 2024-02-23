export function parseRequest (requestStr) {

  function innerParser (innerData) {
    try {
      let parsedInnerData = JSON.parse(innerData);
      return parsedInnerData;
    }
    catch (error) {
      console.error('Error: JSON.parse innerParser', error);
      return {error:'Error: JSON.parse'};
    }
  }

  try {
    let parsedData = JSON.parse(requestStr);
    const {id,type, data } = parsedData;
    return { type ,id, data: innerParser(data) };
  }
  catch (error) {
    console.error('Error: JSON.parse  in parseRequest()', error);
    // generateRenResponse('reg','Error: JSON.parse');
    return {error:'Error: JSON.parse'};
  }

}
