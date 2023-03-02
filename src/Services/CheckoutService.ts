import { OutgoingHttpHeaders } from 'http';
import { Vipps } from 'Vipps';
import { CommonHeaders } from '../infrastructure/CommonHeaders';
import { HttpMethod, IHttpClient } from '../infrastructure/IHttpClient';
import { serialize, deserialize } from '../infrastructure/jsonSerialization';
import { InitiateSessionRequest, InitiateSessionResponse, SessionResponse } from '../autogen/checkout.types';

export class CheckoutService {
  httpClient: IHttpClient;
  headers: OutgoingHttpHeaders;

  constructor(vipps: Vipps) {
    this.httpClient = vipps.httpClient;
    const commonHeaders = new CommonHeaders(vipps);
    this.headers = {
      ...commonHeaders.headers,
      client_id: vipps.configoptions.clientId,
      client_secret: vipps.configoptions.clientSecret,
    } as OutgoingHttpHeaders;
  }

  createSession = async (data: InitiateSessionRequest): Promise<InitiateSessionResponse> => {
    const response = await this.httpClient.makeRequest(
      '/checkout/v3/session',
      HttpMethod.POST,
      this.headers,
      serialize(data),
    );
    return deserialize<InitiateSessionResponse>(response);
  };

  getSessionDetails = async (reference: string): Promise<SessionResponse> => {
    const response = await this.httpClient.makeRequest(
      `/checkout/v3/session/${reference}`,
      HttpMethod.GET,
      this.headers,
    );
    return deserialize<SessionResponse>(response);
  };
}
