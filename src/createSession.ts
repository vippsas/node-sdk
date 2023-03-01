import {
  Api,
  InitiateSessionRequest,
  PaymentTransaction,
  PaymentMerchantInfo,
  RequestParams,
  Amount,
} from './autogen/checkoutapi.js';
import { v4 as uuid } from 'uuid';
import { MERCHANT_HEADERS } from './utils/environment.utils.js';

export const createSession = async () => {
  const orderId = uuid();
  const checkoutapi = new Api();
  const initiateSessionRequest = {
    transaction: {
      amount: {
        currency: 'NOK',
        value: 100,
      } as Amount,
      paymentDescription: 'Test from Node SDK',
      reference: orderId,
    } as PaymentTransaction,
    merchantInfo: {
      returnUrl: 'https://some.where.com/return',
      callbackAuthorizationToken: uuid(),
      callbackUrl: 'https://some.where.com/callback',
      termsAndConditionsUrl: 'https://some.where.com/terms',
    } as PaymentMerchantInfo,
  } as InitiateSessionRequest;
  const requestParams = {
    baseUrl: 'https://ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net/checkout/v3',
    headers: {
      ...MERCHANT_HEADERS,
    },
  } as RequestParams;
  // POST
  const createSessionResponse = await checkoutapi.session.sessionCreate(initiateSessionRequest, requestParams);
  console.log(createSessionResponse.status, createSessionResponse.data);
};
