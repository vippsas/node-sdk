import { OutgoingHttpHeaders } from 'http';
import { VippsConfigurationOptions } from 'infrastructure/VippsConfigurationOptions';
import { Checkout } from 'service/Checkout';

export class Vipps {
  checkout: Checkout;

  constructor(options: VippsConfigurationOptions) {
    // TODO: apitest.vipps.no for testmode
    const hostname = options.useTestMode ? 'ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net' : 'api.vipps.no';
    const port = 443;
    const commonHeaders: OutgoingHttpHeaders = {
      'Content-type': 'application/json; charset="utf-8"',
      'Ocp-Apim-Subscription-Key': options.subscriptionKey,
      'Merchant-Serial-Number': options.merchantSerialNumber,
      'Vipps-System-Name': 'Vipps node SDK',
      'Vipps-System-Version': '0.9.0',
      'Vipps-System-Plugin-Name': options.pluginName,
      'Vipps-System-Plugin-Version': options.pluginVersion,
    };
    this.checkout = new Checkout(hostname, port, options, commonHeaders);
  }
}
