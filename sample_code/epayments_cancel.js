import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import VM from '@vippsno/vipps-sdk'

// First, get your API keys from https://portal.vipps.no/
// Here we assume they are stored in a .env file in the folder you 
// are running this script from, see .env.example
const clientId = process.env.CLIENT_ID || "";
const clientSecret = process.env.CLIENT_SECRET || "";
const merchantSerialNumber = process.env.MERCHANT_SERIAL_NUMBER || "";
const subscriptionKey = process.env.SUBSCRIPTION_KEY || "";

// Create a unique reference for this payment
const reference = uuidv4();
// The phone number of the customer
const customerPhoneNumber = '4747753942';

// Create a new instance of the SDK
const client = new VM({
  clientId: clientId,
  clientSecret: clientSecret,
  subscriptionKey: subscriptionKey,
  merchantSerialNumber: merchantSerialNumber,
  pluginName: 'acme-plugin',
  pluginVersion: '4.5.6',
  useTestMode: true
});

// Create a new payment
const payment = await client.ePayment.createPayment({
  amount: {
      currency: 'NOK',
      value: 1000, // This value equals 10 NOK
  },
  reference,
  paymentMethod: {
      type: 'WALLET',
  },
  userFlow: 'WEB_REDIRECT',
  returnUrl: 'https://developer.vippsmobilepay.com/docs/example-pages/result-page',
  customer: {
      phoneNumber: customerPhoneNumber,
  },
  paymentDescription: "One pair of socks",
});

// Cancel the payment
await client.ePayment.cancelPayment(reference)

// Get the payment event log
const paymentEventLog = await client.ePayment.getPaymentEventLog(reference);
console.log(paymentEventLog);
