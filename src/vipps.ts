import Checkout from './services';
import { VippsConfiguration } from './@types/vipps-configuration.types';

export class Vipps {
  checkout: Checkout;

  constructor(options: VippsConfiguration) {
    this.checkout = new Checkout(options);
  }
}
