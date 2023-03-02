import {
  InitiateSessionRequest,
  PaymentTransaction,
  PaymentMerchantInfo,
  Amount,
} from '../src/autogen/checkout.types.js';
import * as environmentUtils from './environment.utils';
import { Vipps } from '../src/Vipps.js';
import { VippsConfigurationOptions } from '../src/infrastructure/VippsConfigurationOptions.js';

export const createSession = async (): Promise<void> => {
  const orderId = `Node-SDK-${Math.floor(Math.random() * 10000000)}`;
  process.stdout.write(`Creating session with orderId: ${orderId}`);
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
      callbackAuthorizationToken: `CallbackAuthToken-${Math.floor(Math.random() * 10000)}`,
      callbackUrl: 'https://some.where.com/callback',
      termsAndConditionsUrl: 'https://some.where.com/terms',
    } as PaymentMerchantInfo,
  } as InitiateSessionRequest;

  try {
    const createSessionResponse = await vipps.checkoutService.createSession(initiateSessionRequest);
    process.stdout.write(`\nCreated session with orderId: ${orderId}, pollingUrl: ${createSessionResponse.pollingUrl}`);
    const sessionPollResponse = await vipps.checkoutService.getSessionDetails(orderId);
    process.stdout.write(`\nPolling session with orderId: ${orderId}, state: ${sessionPollResponse.sessionState}`);
  } catch (err: unknown) {
    process.stdout.write(`\nError: ${JSON.stringify(err)}\n`);
  }
};
