import { OutgoingHttpHeaders } from 'http';

import {
  CheckoutInitiateSessionRequest,
  CheckoutInitiateSessionResponse,
  CheckoutSessionResponse,
  InternalVippsConfiguration,
} from '../@types';
import { get, post } from '../utils';

export class Checkout {
  private readonly headers: OutgoingHttpHeaders;
  private readonly checkoutSessionPath: string;
  private readonly vippsHostname: string;

  constructor(configuration: InternalVippsConfiguration) {
    const vippsHostname = configuration.useTestMode ? 'https://apitest.vipps.no' : 'https://api.vipps.no';

    this.checkoutSessionPath = '/checkout/v3/session';
    this.vippsHostname = process.env.VIPPS_HOSTNAME || vippsHostname;
    this.headers = {
      client_id: configuration.clientId,
      client_secret: configuration.clientSecret,
      'Content-type': 'application/json; charset="utf-8"',
      'Ocp-Apim-Subscription-Key': configuration.subscriptionKey,
      'Merchant-Serial-Number': configuration.merchantSerialNumber,
      'Vipps-System-Name': configuration.vippsSystemName,
      'Vipps-System-Version': configuration.vippsSystemVersion,
      'Vipps-System-Plugin-Name': configuration.pluginName,
      'Vipps-System-Plugin-Version': configuration.pluginVersion,
    };
  }

  async createSession(requestData: CheckoutInitiateSessionRequest): Promise<CheckoutInitiateSessionResponse> {
    return post<CheckoutInitiateSessionRequest, CheckoutInitiateSessionResponse>(
      this.vippsHostname,
      this.checkoutSessionPath,
      this.headers,
      requestData,
    );
  }

  async getSessionDetails(reference: string): Promise<CheckoutSessionResponse> {
    return get<CheckoutSessionResponse>(this.vippsHostname, `${this.checkoutSessionPath}/${reference}`, this.headers);
  }
}
