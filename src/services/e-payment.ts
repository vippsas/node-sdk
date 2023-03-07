import { OutgoingHttpHeaders } from 'node:http';
import { get, post } from '../utils/http-request';
import { AccessTokenClient } from '../infrastructure/access-token-client';
import * as types from '../@types';

export class EPayment {
  headers: OutgoingHttpHeaders;
  ePaymentPath: string;
  vippsHostname: string;
  accessTokenClient: AccessTokenClient;

  constructor(configuration: types.InternalVippsConfiguration) {
    this.ePaymentPath = '/epayment/v1/payments';
    this.vippsHostname = configuration.useTestMode
      ? 'ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net'
      : 'api.vipps.no';
    this.headers = {
      'Content-type': 'application/json; charset="utf-8"',
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

  async createPayment(
    requestData: types.EPayment.CreatePaymentRequest,
    idempotencyKey: string,
  ): Promise<types.EPayment.CreatePaymentResponse> {
    const accessToken = await this.accessTokenClient.get();
    return post<types.EPayment.CreatePaymentRequest, types.EPayment.CreatePaymentResponse>(
      this.vippsHostname,
      this.ePaymentPath,
      { ...this.headers, 'Idempotency-Key': idempotencyKey, Authorization: `Bearer ${accessToken}` },
      requestData,
    );
  }

  async getPayment(reference: types.EPayment.Reference): Promise<types.EPayment.GetPaymentResponse> {
    const accessToken = await this.accessTokenClient.get();
    return get<types.EPayment.GetPaymentResponse>(this.vippsHostname, `${this.ePaymentPath}/${reference}`, {
      ...this.headers,
      Authorization: `Bearer ${accessToken}`,
    });
  }

  async getPaymentEventLog(reference: types.EPayment.Reference): Promise<types.EPayment.PaymentEvent> {
    const accessToken = await this.accessTokenClient.get();
    return get<types.EPayment.PaymentEvent>(this.vippsHostname, `${this.ePaymentPath}/${reference}/events`, {
      ...this.headers,
      Authorization: `Bearer ${accessToken}`,
    });
  }

  async cancelPayment(
    reference: types.EPayment.Reference,
    idempotencyKey: string,
  ): Promise<types.EPayment.ModificationResponse> {
    const accessToken = await this.accessTokenClient.get();
    return post<void, types.EPayment.ModificationResponse>(
      this.vippsHostname,
      `${this.ePaymentPath}/${reference}/cancel`,
      {
        ...this.headers,
        'Idempotency-Key': idempotencyKey,
        Authorization: `Bearer ${accessToken}`,
      },
    );
  }

  async capturePayment(
    reference: types.EPayment.Reference,
    requestData: types.EPayment.CaptureModificationRequest,
    idempotencyKey: string,
  ): Promise<types.EPayment.ModificationResponse> {
    const accessToken = await this.accessTokenClient.get();
    return post<types.EPayment.CaptureModificationRequest, types.EPayment.ModificationResponse>(
      this.vippsHostname,
      `${this.ePaymentPath}/${reference}/capture`,
      { ...this.headers, 'Idempotency-Key': idempotencyKey, Authorization: `Bearer ${accessToken}` },
      requestData,
    );
  }

  async refundPayment(
    reference: types.EPayment.Reference,
    requestData: types.EPayment.RefundModificationRequest,
    idempotencyKey: string,
  ): Promise<types.EPayment.ModificationResponse> {
    const accessToken = await this.accessTokenClient.get();
    return post<types.EPayment.CaptureModificationRequest, types.EPayment.ModificationResponse>(
      this.vippsHostname,
      `${this.ePaymentPath}/${reference}/refund`,
      { ...this.headers, 'Idempotency-Key': idempotencyKey, Authorization: `Bearer ${accessToken}` },
      requestData,
    );
  }

  async forceApprovePayment(
    reference: types.EPayment.Reference,
    requestData?: types.EPayment.ForceApprove,
  ): Promise<void> {
    const accessToken = await this.accessTokenClient.get();
    return post<types.EPayment.ForceApprove, void>(
      this.vippsHostname,
      `/epayment/v1/test/payments/${reference}/approve`,
      {
        ...this.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      requestData,
    );
  }
}
