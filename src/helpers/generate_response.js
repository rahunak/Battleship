export function generateRenResponse (typeOfRequest, responseStr) {
  let responseData = { typeOfRequest, responseStr, id:0};
  return JSON.stringify(responseData);
}
