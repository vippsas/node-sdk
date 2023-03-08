import { OutgoingHttpHeaders } from 'node:http';
import { post } from '../utils/http-request';
import * as types from '../@types';

type VippsCredentials = Pick<types.InternalVippsConfiguration, 'clientId' | 'clientSecret' | 'subscriptionKey'>;

export class AccessTokenClient {
  tokenSet?: types.AuthorizationTokenResponse;
  vippsCredentials: VippsCredentials;

  hostname: string;
  headers: OutgoingHttpHeaders;

  constructor(vippsCredentials: VippsCredentials, useTestMode = false) {
    this.vippsCredentials = vippsCredentials;
    this.hostname = useTestMode ? 'ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net' : 'api.vipps.no';
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

    const accessTokenResponse = await post<unknown, types.AuthorizationTokenResponse>(
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

    return maxValidTo < new Date(this.tokenSet.expires_on);
  }
}
