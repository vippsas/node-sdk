import { OutgoingHttpHeaders } from 'http';
import { Vipps } from 'Vipps';

export class CommonHeaders {
  headers: OutgoingHttpHeaders;

  constructor(vipps: Vipps) {
    this.headers = {
      'Content-type': 'application/json; charset="utf-8"',
      'Ocp-Apim-Subscription-Key': vipps.configoptions.subscriptionKey,
      'Merchant-Serial-Number': vipps.configoptions.merchantSerialNumber,
      'Vipps-System-Name': vipps.systemName,
      'Vipps-System-Version': vipps.systemVersion,
      'Vipps-System-Plugin-Name': vipps.configoptions.pluginName,
      'Vipps-System-Plugin-Version': vipps.configoptions.pluginVersion,
    } as OutgoingHttpHeaders;
  }
}
