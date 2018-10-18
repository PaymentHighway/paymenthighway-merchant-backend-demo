import responseJson from './responseJson';
import getPaymentApi from './phapi';
import { buildResponse } from './util';

export const transactionId = async (event, context, callback) => {
  return executeTransactinId();
};
 
const transactionIdResponse = (id) => {
    return {
        id: id
    }
}

const executeTransactinId = () => new Promise((resolve, reject) => {

  let paymentAPI = getPaymentApi();

  paymentAPI
    .initTransaction()
    .then((response) => {
      let result = buildResponse(response, transactionIdResponse(response.id));
      resolve(responseJson(200, result));
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
});
