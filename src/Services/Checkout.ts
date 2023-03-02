import { OutgoingHttpHeaders } from 'http';
import { VippsConfigurationOptions } from 'infrastructure/VippsConfigurationOptions';
import { get, post } from 'infrastructure/httpRequest';
import { serialize, deserialize } from 'infrastructure/jsonSerialization';
import { InitiateSessionRequest, InitiateSessionResponse, SessionResponse } from 'autogen/checkout.types';

export class Checkout {
  hostname: string;
  port: number;
  headers: OutgoingHttpHeaders;
  checkoutSessionPath: string;

  constructor(
    hostname: string,
    port: number,
    configoptions: VippsConfigurationOptions,
    commonHeaders: OutgoingHttpHeaders,
  ) {
    this.checkoutSessionPath = '/checkout/v3/session';
    this.hostname = hostname;
    this.port = port;
    this.headers = {
      ...commonHeaders,
      client_id: configoptions.clientId,
      client_secret: configoptions.clientSecret,
    };
  }

  createSession = async (data: InitiateSessionRequest): Promise<InitiateSessionResponse> => {
    const response = await post(this.hostname, this.port, this.checkoutSessionPath, this.headers, serialize(data));
    return deserialize<InitiateSessionResponse>(response);
  };

  getSessionDetails = async (reference: string): Promise<SessionResponse> => {
    const response = await get(this.hostname, this.port, `${this.checkoutSessionPath}/${reference}`, this.headers);
    return deserialize<SessionResponse>(response);
  };
}
