import { OutgoingHttpHeaders } from 'node:http';
import { v4 as uuidv4 } from 'uuid';

import {
  EPaymentCaptureModificationRequest,
  EPaymentCreatePaymentRequest,
  EPaymentCreatePaymentResponse,
  EPaymentForceApprove,
  EPaymentGetPaymentResponse,
  EPaymentModificationResponse,
  EPaymentPaymentEvent,
  EPaymentReference,
  EPaymentRefundModificationRequest,
  InternalVippsConfiguration,
} from '../@types';
import { AccessTokenClient } from '../infrastructure';
import { get, post } from '../utils';

export class EPayment {
  private headers: OutgoingHttpHeaders;
  private ePaymentPath: string;
  private vippsHostname: string;
  private accessTokenClient: AccessTokenClient;

  constructor(configuration: InternalVippsConfiguration) {
    this.ePaymentPath = '/epayment/v1/payments';
    this.vippsHostname =
      process.env.VIPPS_HOSTNAME ?? configuration.useTestMode ? 'https://apitest.vipps.no' : 'https://api.vipps.no';
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

  async createPayment(requestData: EPaymentCreatePaymentRequest): Promise<EPaymentCreatePaymentResponse> {
    const accessToken = await this.accessTokenClient.get();
    const idempotencyKey = uuidv4();
    return post<EPaymentCreatePaymentRequest, EPaymentCreatePaymentResponse>(
      this.vippsHostname,
      this.ePaymentPath,
      { ...this.headers, 'Idempotency-Key': idempotencyKey, Authorization: `Bearer ${accessToken}` },
      requestData,
    );
  }

  async getPayment(reference: EPaymentReference): Promise<EPaymentGetPaymentResponse> {
    const accessToken = await this.accessTokenClient.get();
    return get<EPaymentGetPaymentResponse>(this.vippsHostname, `${this.ePaymentPath}/${reference}`, {
      ...this.headers,
      Authorization: `Bearer ${accessToken}`,
    });
  }

  async getPaymentEventLog(reference: EPaymentReference): Promise<EPaymentPaymentEvent[]> {
    const accessToken = await this.accessTokenClient.get();
    return get<EPaymentPaymentEvent[]>(this.vippsHostname, `${this.ePaymentPath}/${reference}/events`, {
      ...this.headers,
      Authorization: `Bearer ${accessToken}`,
    });
  }

  async cancelPayment(reference: EPaymentReference): Promise<EPaymentModificationResponse> {
    const accessToken = await this.accessTokenClient.get();
    const idempotencyKey = uuidv4();
    return post<void, EPaymentModificationResponse>(this.vippsHostname, `${this.ePaymentPath}/${reference}/cancel`, {
      ...this.headers,
      'Idempotency-Key': idempotencyKey,
      Authorization: `Bearer ${accessToken}`,
    });
  }

  async capturePayment(
    reference: EPaymentReference,
    requestData: EPaymentCaptureModificationRequest,
  ): Promise<EPaymentModificationResponse> {
    const accessToken = await this.accessTokenClient.get();
    const idempotencyKey = uuidv4();
    return post<EPaymentCaptureModificationRequest, EPaymentModificationResponse>(
      this.vippsHostname,
      `${this.ePaymentPath}/${reference}/capture`,
      { ...this.headers, 'Idempotency-Key': idempotencyKey, Authorization: `Bearer ${accessToken}` },
      requestData,
    );
  }

  async refundPayment(
    reference: EPaymentReference,
    requestData: EPaymentRefundModificationRequest,
  ): Promise<EPaymentModificationResponse> {
    const accessToken = await this.accessTokenClient.get();
    const idempotencyKey = uuidv4();
    return post<EPaymentCaptureModificationRequest, EPaymentModificationResponse>(
      this.vippsHostname,
      `${this.ePaymentPath}/${reference}/refund`,
      { ...this.headers, 'Idempotency-Key': idempotencyKey, Authorization: `Bearer ${accessToken}` },
      requestData,
    );
  }

  async forceApprovePayment(reference: EPaymentReference, requestData?: EPaymentForceApprove): Promise<void> {
    const accessToken = await this.accessTokenClient.get();
    return post<EPaymentForceApprove, void>(
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
