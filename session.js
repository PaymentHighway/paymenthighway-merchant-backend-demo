import { isValidApplePayGateway } from './validateApplePayGateway';
import responseJson from './responseJson';
import { parseJson } from './util';
import request from 'request';

export const create = async (event, context, callback) => {

    const serverlessRequest = parseJson(event.body, {url: '', body: {}});
    const endpointURL = serverlessRequest.url || '';

    if (!isValidApplePayGateway(endpointURL)) {
        callBack(null, responseJson(400, {message: 'Invalid Apple Pay gateway!'}))
        return
    }
    return createSession(endpointURL, serverlessRequest.body);
};

const createSession = (endpointURL, body) => new Promise((resolve, reject) => {

  const merchIdentityCert = process.env.MERCHANT_IDENTITY_CERT;
  const merchIdentityKey = process.env.MERCHANT_IDENTITY_KEY;

  const options = {
    method: 'POST',
    uri: endpointURL,
    cert: merchIdentityCert,
    key: merchIdentityKey,
    body: body || {},
    json: true,
  };

  request(options, (error, response, body) => {

    let serverlessResponse = {};

    if (error) {
      console.error('Create session failed:', error);
      serverlessResponse = responseJson(500, {"message": "Create session failed!" });
    } else {

      if (body.statusCode === '400') {
        console.err('Error creating session: ' + body.statusMessage );
        serverlessResponse = responseJson(400, {"message": body.statusMessage });
      } else {
        serverlessResponse = responseJson(200, body);
      }
    }

    resolve(serverlessResponse);
  });

});
