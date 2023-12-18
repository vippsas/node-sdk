import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import VM from '@vippsno/vipps-sdk'

// First, get your API keys from https://portal.vipps.no/
// Here we assume they are stored in a .env file in the folder you are running this script from
const clientId = process.env.CLIENT_ID || "";
const clientSecret = process.env.CLIENT_SECRET || "";
const merchantSerialNumber = process.env.MERCHANT_SERIAL_NUMBER || "";
const subscriptionKey = process.env.SUBSCRIPTION_KEY || "";

const callbackAuthorizationToken = uuidv4();

const client = new VM({
  clientId: clientId,
  clientSecret: clientSecret,
  subscriptionKey: subscriptionKey,
  merchantSerialNumber: merchantSerialNumber,
  vippsSystemName: "My Ecommerce system",
  vippsSystemVersion: "1.0.0",
  pluginName: "My Plugin",
  pluginVersion: "1.0.0",
  useTestMode: true
});

// Create a checkout session
await client.checkout.createSession({
  merchantInfo: {
    callbackUrl: "https://example.com/callbackUrl",
    returnUrl: "https://example.com/fallbackPage",
    callbackAuthorizationToken
  },
  transaction: {
    amount: {
      currency: 'NOK',
      value: 1000 // This value equals 10 NOK
    },
    reference: 'orderid1234',
    paymentDescription: 'One pair of socks.'
  },
});

const checkoutSessionDetails = await client.checkout.getSessionDetails('orderid1234');
console.log("Session details are:\n", checkoutSessionDetails);
