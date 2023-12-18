import { Checkout, EPayment } from './services';
import { VippsConfiguration } from './@types';

export class Vipps {
  checkout: Checkout;
  ePayment: EPayment;

  constructor(options: VippsConfiguration) {
    this.checkout = new Checkout({...options});
    this.ePayment = new EPayment({...options});
  }
}
