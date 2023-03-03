import { OutgoingHttpHeaders } from 'http';
import { VippsConfiguration } from '../@types/vipps-configuration.types';
import { get, post } from '../infrastructure/http-request';
import { InitiateSessionRequest, InitiateSessionResponse, SessionResponse } from '../@types/checkout.types';

export class Checkout {
  headers: OutgoingHttpHeaders;
  configuration: VippsConfiguration;
  checkoutSessionPath: string;

  constructor(configuration: VippsConfiguration) {
    this.configuration = configuration;
    this.checkoutSessionPath = '/checkout/v3/session';
    this.headers = {
      client_id: configuration.clientId,
      client_secret: configuration.clientSecret,
    };
  }

  createSession = async (data: InitiateSessionRequest) => {
    const response = await post<InitiateSessionRequest, InitiateSessionResponse>(
      this.configuration,
      this.checkoutSessionPath,
      this.headers,
      data,
    );
    return response;
  };

  getSessionDetails = async (reference: string) => {
    const response = await get<SessionResponse>(
      this.configuration,
      `${this.checkoutSessionPath}/${reference}`,
      this.headers,
    );
    return response;
  };
}
