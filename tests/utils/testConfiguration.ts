import { InternalVippsConfiguration } from '@types';

export const internalVippsConfiguration: InternalVippsConfiguration = {
  pluginName: 'test',
  pluginVersion: '1',
  clientId: process.env.CLIENT_ID || process.exit(1),
  clientSecret: process.env.CLIENT_SECRET || process.exit(1),
  subscriptionKey: process.env.SUBSCRIPTION_KEY || process.exit(1),
  merchantSerialNumber: process.env.MERCHANT_SERIAL_NUMBER || process.exit(1),
  vippsSystemName: 'Vipps sdk test',
  vippsSystemVersion: '1',
  useTestMode: true,
};
