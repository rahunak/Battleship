export function parseRequest (requestStr) {

  function innerParser (innerData) {
    try {
      let parsedInnerData = JSON.parse(innerData.toString());
      return parsedInnerData;
    }
    catch (error) {
      if (innerData.trim() === '') return '';
      console.error('Error: JSON.parse innerParser', error);
      return {error:'Error: JSON.parse'};
    }
  }

  try {
    let parsedData = JSON.parse(requestStr.toString());
    const {id,type, data } = parsedData;
    return { type ,id, data: innerParser(data) };
  }
  catch (error) {
    console.error('Error: JSON.parse  in parseRequest()', error);
    // generateResponse('reg','Error: JSON.parse');
    return {error:'Error: JSON.parse'};
  }

}
