/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface WebhooksExtraDetail {
  /** @example "url" */
  name: string;
  /** @example "The property is required and cannot be null or empty." */
  reason: string;
}

export interface WebhooksProblemDetails {
  /** @example "00-bb841c551513e233de8a01472013fa9f-542c71e40916a6ce-00" */
  type?: string | null;
  /** @example "Bad Request" */
  title?: string | null;
  /**
   * @format int32
   * @example 400
   */
  status?: number | null;
  /** @example "One or more validation errors occurred." */
  detail?: string | null;
  /** @example "/v1/webhooks" */
  instance?: string | null;
  /** @example "00-bb841c551513e233de8a01472013fa9f-542c71e40916a6ce-00" */
  traceId?: string | null;
  extraDetails?: WebhooksExtraDetail[] | null;
}

export interface WebhooksQueryResponse {
  webhooks: WebhooksWebhook[];
}

export interface WebhooksRegisterRequest {
  /**
   * The URL that updates should be sent to.
   * Must be a valid, world-reachable URL.
   * The URL must use HTTPS.
   * Can not be a URL that redirects to a different URL.
   * We don't send requests to all ports, so to be safe use common ports such as: 80, 443, 8080.
   * @format uri
   * @example "https://example.com/webhook-callback"
   */
  url: string;
  /**
   * See [Webhooks API Events](https://developer.vippsmobilepay.com/docs/APIs/webhooks-api/events/) for details.
   * @example ["service.payment.captured.v1","service.payment.created.v2"]
   */
  events: string[];
}

export interface WebhooksRegisterResponse {
  /** @format uuid */
  id: string;
  /** @example "090a478d-37ff-4e77-970e-d457aeb26a3a" */
  secret: string;
}

export interface WebhooksWebhook {
  /** @format uuid */
  id: string;
  /**
   * @format uri
   * @example "https://example.com/callbacks"
   */
  url: string;
  /** @example ["service.payment.captured.v1","service.payment.created.v2"] */
  events: string[];
}

export interface GetWebhooksResponse {
  webhooks: [WebhooksWebhook];
}
