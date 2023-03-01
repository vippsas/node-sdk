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

export const createSession = async (): Promise<void> => {
  const orderId = uuid();
  console.log(`Creating session with orderId: ${orderId}`);
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

  try {
    const createSessionResponse = await vipps.checkoutService.createSession(initiateSessionRequest);
    console.log(`Created session with orderId: ${orderId}, pollingUrl: ${createSessionResponse.pollingUrl}`);
    const sessionPollResponse = await vipps.checkoutService.getSessionDetails(orderId);
    console.log(`Polling session with orderId: ${orderId}, state: ${sessionPollResponse.sessionState}`);
  } catch (err) {
    console.log(err);
  }
};
