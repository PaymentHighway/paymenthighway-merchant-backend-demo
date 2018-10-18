import { PaymentAPI } from 'paymenthighway';
  
const getPaymentApi = () => {

  const phServiceUrl = process.env.PH_SERVICE_URL;
  const phKey = process.env.PH_KEY;
  const phSecret = process.env.PH_SECRET;
  const phAccount = process.env.PH_ACCOUNT;
  const phMerchant = process.env.PH_MERCHANT;

  return new PaymentAPI(
    phServiceUrl,
    phKey,
    phSecret,
    phAccount,
    phMerchant
  );
};

export const isResponse = (response) => {
	return (response && response.result && response.result.code) ? true : false;
}

export const isSuccess = (response) => {
  return isResponse(response) ? response.result.code == 100 : false;  
}

export default getPaymentApi;