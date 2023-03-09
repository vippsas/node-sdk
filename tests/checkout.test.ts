import { v4 as uuidv4 } from 'uuid';
import { Checkout } from '../src/services';
import { internalVippsConfiguration } from './utils/testConfiguration';

describe('Checkout Integration Test', () => {
  test('Should create and get session', async () => {
    const checkout = new Checkout(internalVippsConfiguration);
    const reference = uuidv4();
    const checkoutSession = await checkout.createSession({
      merchantInfo: {
        callbackAuthorizationToken: 'secret-token',
        callbackUrl: 'https://your-url-here.com:3000',
        returnUrl: 'https://your-url-here.com:3000',
      },
      transaction: {
        amount: {
          currency: 'NOK',
          value: 100,
        },
        reference,
        paymentDescription: 'A pair of socks',
      },
    });
    expect(checkoutSession).not.toBeNull();
    const checkoutSessionDetails = await checkout.getSessionDetails(reference);
    expect(checkoutSessionDetails).not.toBeNull();
    expect(checkoutSessionDetails.reference).toBe(reference);
  });
});
