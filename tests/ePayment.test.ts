import { v4 as uuidv4 } from 'uuid';

import * as types from '../src/@types';
import { EPayment } from '../src/services';

import { vippsConfiguration } from './testConfiguration';
const customerPhoneNumber = '4747753942';

describe('EPayment Integration Test', () => {
  test('Should create, cancel and get correct payment', async () => {
    const ePayment = new EPayment(vippsConfiguration);
    const reference = uuidv4();
    const payment = await ePayment.createPayment({
      amount: {
        currency: 'NOK',
        value: 100,
      },
      reference,
      paymentMethod: {
        type: 'WALLET',
      },
      userFlow: 'WEB_REDIRECT',
      returnUrl: 'example.com/test',
      customer: {
        phoneNumber: customerPhoneNumber,
      },
    });
    expect(payment).not.toBeNull();

    const cancelPaymentResponse = await ePayment.cancelPayment(reference);
    expect(cancelPaymentResponse).not.toBeNull();
    expect(cancelPaymentResponse.reference).toBe(reference);
    expect(cancelPaymentResponse.state).toBe('TERMINATED');

    const paymentDetails = await ePayment.getPayment(reference);
    expect(paymentDetails).not.toBeNull();
    expect(paymentDetails.reference).toBe(reference);
    expect(paymentDetails.state).toBe('TERMINATED');
  }, 40_000);

  test('Should create, approve, capture and refund correct payment', async () => {
    const ePayment = new EPayment(vippsConfiguration);
    const reference = uuidv4();
    const createPaymentRequest: types.EPaymentCreatePaymentRequest = {
      amount: {
        currency: 'NOK',
        value: 100,
      },
      reference,
      paymentMethod: {
        type: 'WALLET',
      },
      userFlow: 'WEB_REDIRECT',
      returnUrl: 'example.com/test',
      customer: {
        phoneNumber: customerPhoneNumber,
      },
    };
    const payment = await ePayment.createPayment(createPaymentRequest);
    expect(payment).not.toBeNull();

    await ePayment.forceApprovePayment(reference, {
      customer: { phoneNumber: customerPhoneNumber },
    });

    const captureResponse = await ePayment.capturePayment(reference, {
      modificationAmount: createPaymentRequest.amount,
    });
    expect(captureResponse).not.toBeNull();
    expect(captureResponse.reference).toBe(reference);
    expect(captureResponse.state).toBe('AUTHORIZED');
    expect(captureResponse.amount).toEqual(createPaymentRequest.amount);

    const refundResponse = await ePayment.refundPayment(reference, {
      modificationAmount: createPaymentRequest.amount,
    });
    expect(refundResponse).not.toBeNull();
    expect(refundResponse.reference).toBe(reference);
    expect(refundResponse.state).toBe('AUTHORIZED');
    expect(refundResponse.amount).toEqual(createPaymentRequest.amount);

    const paymentEvents = await ePayment.getPaymentEventLog(reference);
    expect(paymentEvents).not.toBeNull();
    expect(paymentEvents).toHaveLength(4);
    expect(paymentEvents.filter((event) => event.name === 'CREATED')).toHaveLength(1);
    expect(paymentEvents.filter((event) => event.name === 'CAPTURED')).toHaveLength(1);
    expect(paymentEvents.filter((event) => event.name === 'REFUNDED')).toHaveLength(1);
    expect(paymentEvents.filter((event) => event.name === 'AUTHORIZED')).toHaveLength(1);
  }, 80_000);
});
