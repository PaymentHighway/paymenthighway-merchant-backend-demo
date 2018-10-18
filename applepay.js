import responseJson from './responseJson';
import { parseJson } from './util';
import getPaymentApi from './phapi';

export const debit = async (event, context, callback) => {
  const serverlessRequest = parseJson(event.body, {});
  return executeDebit(serverlessRequest);
};
  
const executeDebit = (serverlessRequest) => new Promise((resolve, reject) => {

  let paymentAPI = getPaymentApi();

  paymentAPI
    .initTransaction()
    .then((response) => {
      return paymentAPI.debitApplePayTransaction(response.id, serverlessRequest);
    })
    .then((response) => {
      console.info('successful response from Payment Highway (Apple Pay Debit):', JSON.stringify(response));
      resolve(responseJson(200, response.result));
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
});
