import { HttpMethod, IHttpClient } from '../infrastructure/IHttpClient';
import { InitiateSessionRequest, InitiateSessionResponse, SessionResponse } from '../autogen/checkout.types';
import { OutgoingHttpHeaders } from 'http';
import { Vipps } from 'Vipps';

export class CheckoutService {
  httpClient: IHttpClient;
  headers: OutgoingHttpHeaders;

  constructor(vipps: Vipps) {
    this.httpClient = vipps.httpClient;
    this.headers = {
      'Content-type': 'application/json; charset="utf-8"',
      'Ocp-Apim-Subscription-Key': vipps.configoptions.subscriptionKey,
      'Merchant-Serial-Number': vipps.configoptions.merchantSerialNumber,
      'Vipps-System-Name': vipps.systemName,
      'Vipps-System-Version': vipps.systemVersion,
      'Vipps-System-Plugin-Name': vipps.configoptions.pluginName,
      'Vipps-System-Plugin-Version': vipps.configoptions.pluginVersion,
      client_id: vipps.configoptions.clientId,
      client_secret: vipps.configoptions.clientSecret,
    } as OutgoingHttpHeaders;
  }

  createSession = async (data: InitiateSessionRequest): Promise<InitiateSessionResponse> => {
    const response = await this.httpClient.makeRequest(
      '/checkout/v3/session',
      HttpMethod.POST,
      this.headers,
      JSON.stringify(data),
    );
    const parsed = JSON.parse(response) as InitiateSessionResponse;
    return parsed;
  };

  getSessionDetails = async (reference: string): Promise<SessionResponse> => {
    const response = await this.httpClient.makeRequest(
      `/checkout/v3/session/${reference}`,
      HttpMethod.GET,
      this.headers,
    );
    const parsed = JSON.parse(response) as SessionResponse;
    return parsed;
  };
}
