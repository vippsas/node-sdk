import { OutgoingHttpHeaders } from 'http';
import { VippsConfigurationOptions } from '../infrastructure/VippsConfigurationOptions';
import { get, post } from '../infrastructure/httpRequest';
import { InitiateSessionRequest, InitiateSessionResponse, SessionResponse } from '../autogen/checkout.types';

export class Checkout {
  headers: OutgoingHttpHeaders;
  configoptions: VippsConfigurationOptions;
  checkoutSessionPath: string;

  constructor(configoptions: VippsConfigurationOptions) {
    this.configoptions = configoptions;
    this.checkoutSessionPath = '/checkout/v3/session';
    this.headers = {
      client_id: configoptions.clientId,
      client_secret: configoptions.clientSecret,
    };
  }

  createSession = async (data: InitiateSessionRequest) => {
    const response = await post<InitiateSessionRequest, InitiateSessionResponse>(
      this.configoptions,
      this.checkoutSessionPath,
      this.headers,
      data,
    );
    return response;
  };

  getSessionDetails = async (reference: string) => {
    const response = await get<SessionResponse>(
      this.configoptions,
      `${this.checkoutSessionPath}/${reference}`,
      this.headers,
    );
    return response;
  };
}
