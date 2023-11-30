import { OutgoingHttpHeaders } from 'node:http';

import { AuthorizationTokenResponse, InternalVippsConfiguration } from '../@types';
import { post } from '../utils';

export type VippsCredentials = Pick<InternalVippsConfiguration, 'clientId' | 'clientSecret' | 'subscriptionKey'>;

export class AccessTokenClient {
  tokenSet?: AuthorizationTokenResponse;
  vippsCredentials: VippsCredentials;

  hostname: string;
  headers: OutgoingHttpHeaders;

  constructor(vippsCredentials: VippsCredentials, useTestMode = false) {
    this.vippsCredentials = vippsCredentials;
    this.hostname = process.env.VIPPS_HOSTNAME ?? useTestMode ? 'https://apitest.vipps.no' : 'https://api.vipps.no';
    this.headers = {
      client_id: vippsCredentials.clientId,
      client_secret: vippsCredentials.clientSecret,
      'Ocp-Apim-Subscription-Key': vippsCredentials.subscriptionKey,
    };
  }

  async get(): Promise<string> {
    if (this.tokenSet && !this.isExpired()) {
      return this.tokenSet.access_token;
    }

    const accessTokenResponse = await post<unknown, AuthorizationTokenResponse>(
      this.hostname,
      '/accesstoken/get',
      this.headers,
    );
    this.tokenSet = accessTokenResponse;
    return accessTokenResponse.access_token;
  }

  private isExpired(): boolean {
    if (!this.tokenSet) {
      return true;
    }

    const maxValidTo = new Date();
    maxValidTo.setMinutes(maxValidTo.getMinutes() - 3);

    const expiresOn = new Date(0);
    expiresOn.setSeconds(this.tokenSet.expires_on);

    return maxValidTo < expiresOn;
  }
}
