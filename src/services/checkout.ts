import { OutgoingHttpHeaders } from 'http';
import { get, post } from '../utils/http-request';
import * as types from '../@types';

export class Checkout {
  headers: OutgoingHttpHeaders;
  checkoutSessionPath: string;
  vippsHostname: string;

  constructor(configuration: types.InternalVippsConfiguration) {
    this.checkoutSessionPath = '/checkout/v3/session';
    // TODO: apitest.vipps.no for testmode
    this.vippsHostname = configuration.useTestMode
      ? 'ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net'
      : 'api.vipps.no';
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

  async createSession(
    requestData: types.Checkout.InitiateSessionRequest,
  ): Promise<types.Checkout.InitiateSessionResponse> {
    return post<types.Checkout.InitiateSessionRequest, types.Checkout.InitiateSessionResponse>(
      this.vippsHostname,
      this.checkoutSessionPath,
      this.headers,
      requestData,
    );
  }

  async getSessionDetails(reference: string): Promise<types.Checkout.SessionResponse> {
    return get<types.Checkout.SessionResponse>(
      this.vippsHostname,
      `${this.checkoutSessionPath}/${reference}`,
      this.headers,
    );
  }
}
