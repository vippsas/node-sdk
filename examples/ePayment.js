const { URL } = require('url');
const Vipps = require('../lib');

(async () => {
  const config = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    merchantSerialNumber: process.env.MERCHANT_SERIAL_NUMBER,
    pluginName: 'PluginName',
    pluginVersion: 'PluginVersion',
    subscriptionKey: process.env.SUBSCRIPTION_KEY,
    useTestMode: true,
  };

  const vipps = new Vipps(config);

  const reference = `Node-SDK-${Math.floor(Math.random() * 10000000)}`;
  const paymentRequest = {
    amount: {
      currency: 'NOK',
      value: 1000,
    },
    reference: reference,
    paymentMethod: {
      type: 'WALLET',
    },
    userFlow: 'WEB_REDIRECT',
    returnUrl: 'example.com/test',
    customer: {
      phoneNumber: '4798909890',
    },
  };

  console.log(`---- Creating payment with reference ${reference}`);
  const payment = await vipps.ePayment.createPayment(paymentRequest);
  console.log(payment);

  console.log(`---- Getting payment with reference ${reference}`);
  const paymentPolling = await vipps.ePayment.getPayment(reference);
  console.log(paymentPolling);

  console.log(`---- Getting payment event log with reference ${reference}`);
  const paymentEventLog = await vipps.ePayment.getPaymentEventLog(reference);
  console.log(paymentEventLog);

  console.log(`---- Force approving payment with reference ${reference}`);
  const forceApprovePaymentRequest = {
    token: new URL(payment.redirectUrl).searchParams.get('token'),
    customer: {
      phoneNumber: '4798909890',
    },
  };
  const paymentForceApprove = await vipps.ePayment.forceApprovePayment(reference, forceApprovePaymentRequest);
  console.log(paymentForceApprove);

  console.log(`---- Capturing 1NOK for payment with reference ${reference}`);
  const captureRequest = {
    modificationAmount: {
      amount: {
        currency: 'NOK',
        value: 100,
      },
    },
  };
  const paymentCapture = await vipps.ePayment.capturePayment(reference, captureRequest);
  console.log(paymentCapture);

  console.log(`---- Refunding 1NOK for payment with reference ${reference}`);
  const refundRequest = {
    modificationAmount: {
      amount: {
        currency: 'NOK',
        value: 100,
      },
    },
  };
  const paymentRefund = await vipps.ePayment.refundPayment(reference, refundRequest);
  console.log(paymentRefund);

  console.log(`---- Cancelling payment with reference ${reference}`);
  const paymentCancel = await vipps.ePayment.cancelPayment(reference);
  console.log(paymentCancel);
})();
