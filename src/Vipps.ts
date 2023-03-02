import { VippsConfigurationOptions } from './infrastructure/VippsConfigurationOptions';
import { Checkout } from './services/Checkout';

export class Vipps {
  checkout: Checkout;

  constructor(options: VippsConfigurationOptions) {
    this.checkout = new Checkout(options);
  }
}
