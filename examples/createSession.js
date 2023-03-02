const Vipps = require('../lib/Vipps.js');
const environmentUtils = require('./environment.utils');

const createSession = async () => {
  const orderId = `Node-SDK-${Math.floor(Math.random() * 10000000)}`;
  const config = {
    clientId: environmentUtils.CLIENT_ID,
    clientSecret: environmentUtils.CLIENT_SECRET,
    merchantSerialNumber: environmentUtils.MERCHANT_SERIAL_NUMBER,
    pluginName: 'PluginName',
    pluginVersion: 'PluginVersion',
    subscriptionKey: environmentUtils.SUBSCRIPTION_KEY,
    useTestMode: true,
  };

  const vipps = new Vipps.Vipps(config);

  const initiateSessionRequest = {
    transaction: {
      amount: {
        currency: 'NOK',
        value: 100,
      },
      paymentDescription: 'Test from Node SDK',
      reference: orderId,
    },
    merchantInfo: {
      returnUrl: 'https://some.where.com/return',
      callbackAuthorizationToken: `CallbackAuthToken-${Math.floor(Math.random() * 10000)}`,
      callbackUrl: 'https://some.where.com/callback',
      termsAndConditionsUrl: 'https://some.where.com/terms',
    },
  };

  await vipps.checkout.createSession(initiateSessionRequest);

  const sessionPollResponse = await vipps.checkout.getSessionDetails(orderId);
  if (sessionPollResponse.sessionState !== 'SessionCreated') {
    throw new Error('Session was  not in state Created');
  }
};

module.exports = { createSession };
