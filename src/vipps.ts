import { Checkout, EPayment } from './services';
import * as types from './@types';

const VIPPS_SYSTEM_NAME = 'Vipps Node SDK';
const VIPPS_SYSTEM_VERSION = '0.9.0';

export class Vipps {
  checkout: Checkout;
  ePayment: EPayment;

  constructor(options: types.VippsConfiguration) {
    this.checkout = new Checkout({
      ...options,
      vippsSystemName: VIPPS_SYSTEM_NAME,
      vippsSystemVersion: VIPPS_SYSTEM_VERSION,
    });
    this.ePayment = new EPayment({
      ...options,
      vippsSystemName: VIPPS_SYSTEM_NAME,
      vippsSystemVersion: VIPPS_SYSTEM_VERSION,
    });
  }
}
