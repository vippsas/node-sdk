import {
  InitiateSessionRequest,
  PaymentTransaction,
  PaymentMerchantInfo,
  Amount,
} from '../src/autogen/checkout.types.js';
import { v4 as uuid } from 'uuid';
import * as environmentUtils from './environment.utils.js';
import { Vipps } from '../src/Vipps.js';
import { VippsConfigurationOptions } from '../src/infrastructure/VippsConfigurationOptions.js';

export const createSession = async () => {
  const orderId = uuid();
  const vipps = new Vipps({
    clientId: environmentUtils.CLIENT_ID,
    clientSecret: environmentUtils.CLIENT_SECRET,
    merchantSerialNumber: environmentUtils.MERCHANT_SERIAL_NUMBER,
    pluginName: 'PluginName',
    pluginVersion: 'PluginVersion',
    subscriptionKey: environmentUtils.SUBSCRIPTION_KEY,
    useTestMode: true,
  } as VippsConfigurationOptions);

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

  // POST
  const createSessionResponse = vipps.checkoutService.createSession(initiateSessionRequest);
  console.log(createSessionResponse);
};
