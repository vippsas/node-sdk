import { OutgoingHttpHeaders } from 'node:http';

import {
  GetWebhooksResponse,
  InternalVippsConfiguration,
  WebhooksRegisterRequest,
  WebhooksRegisterResponse,
  WebhooksWebhook,
} from '../@types';
import { AccessTokenClient } from '../infrastructure';
import { deleteRequest, get, post } from '../utils';

export class Webhooks {
  private headers: OutgoingHttpHeaders;
  private webhooksPath: string;
  private vippsHostname: string;
  private accessTokenClient: AccessTokenClient;

  constructor(configuration: InternalVippsConfiguration) {
    const vippsHostname = configuration.useTestMode ? 'https://apitest.vipps.no' : 'https://api.vipps.no';

    this.webhooksPath = '/webhooks/v1/webhooks';
    this.vippsHostname = process.env.VIPPS_HOSTNAME || vippsHostname;
    this.headers = {
      'Content-type': 'application/json; charset=utf-8',
      'Ocp-Apim-Subscription-Key': configuration.subscriptionKey,
      'Merchant-Serial-Number': configuration.merchantSerialNumber,
      'Vipps-System-Name': configuration.vippsSystemName,
      'Vipps-System-Version': configuration.vippsSystemVersion,
      'Vipps-System-Plugin-Name': configuration.pluginName,
      'Vipps-System-Plugin-Version': configuration.pluginVersion,
    };
    this.accessTokenClient = new AccessTokenClient(
      {
        clientId: configuration.clientId,
        clientSecret: configuration.clientSecret,
        subscriptionKey: configuration.subscriptionKey,
      },
      !!configuration.useTestMode,
    );
  }

  async createWebhook(requestData: WebhooksRegisterRequest): Promise<WebhooksRegisterResponse> {
    const accessToken = await this.accessTokenClient.get();
    return post<WebhooksRegisterRequest, WebhooksRegisterResponse>(
      this.vippsHostname,
      this.webhooksPath,
      {
        ...this.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      requestData,
    );
  }

  async getWebhooks(): Promise<[WebhooksWebhook]> {
    const accessToken = await this.accessTokenClient.get();
    const response: GetWebhooksResponse = await get<GetWebhooksResponse>(this.vippsHostname, this.webhooksPath, {
      ...this.headers,
      Authorization: `Bearer ${accessToken}`,
    });
    return response.webhooks;
  }

  async deleteWebhook(id: string): Promise<void> {
    const accessToken = await this.accessTokenClient.get();
    await deleteRequest(this.vippsHostname, `${this.webhooksPath}/${id}`, {
      ...this.headers,
      Authorization: `Bearer ${accessToken}`,
    });
  }
}
