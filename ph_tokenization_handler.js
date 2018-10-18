import responseJson from './responseJson';
import getPaymentApi from './phapi';
import { buildResponse } from './util';

export const tokenization = async (event, context, callback) => {
    return executeTokenization(event);
};
        
const transactionTokenResponse = (token) => {
    if (!token) return {}
    return {
        token: token
    }
}

const transactionCardResponse = (card) => {
    if (!card) return {}
    return {
        card: {
            cardType: card.type,
            partialPan: card.partial_pan,
            expireMonth: card.expire_month,
            expireYear: card.expire_year    
        }
    }
}

const executeTokenization = (event) => new Promise((resolve, reject) => {
  
  let paymentAPI = getPaymentApi();

  const transactionId = event.pathParameters.transactionId;

  paymentAPI
    .tokenization(transactionId)
    .then((response) => {
      let result = buildResponse(response,
                                 transactionTokenResponse(response.card_token),
                                 transactionCardResponse(response.card));
      resolve(responseJson(200, result));
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
});
