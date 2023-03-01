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

/**
 * Customer
 * Target customer
 */
export interface Customer {
  /**
   * The phone number of the user paying the transaction with Vipps.
   * Only Norwegian mobile numbers are supported (for now).
   * The format is MSISDN: Digits only: Country code and subscriber
   * number, but no prefix.
   *
   * See: https://en.wikipedia.org/wiki/MSISDN
   * @minLength 10
   * @maxLength 15
   * @pattern ^\d{10,15}$
   * @example 4791234567
   */
  phoneNumber?: string;
}

/** Amount object */
export interface Amount {
  /** Currency code as defined in ISO 4217. eg NOK for Norwegian kroner. */
  currency: Currency;
  /**
   * Integer value of price in the currency's monetary subunit (e.g., Norwegian øre),
   * or monetary unit where applicable (e.g., Japanese YEN). The type of the monetary
   * unit is defined in ISO 4217.
   * @format int64
   * @min 0
   * @max 65000000
   * @example 1000
   */
  value: number;
}

/**
 * Currency code as defined in ISO 4217. eg NOK for Norwegian kroner.
 * @example "NOK"
 */
export enum Currency {
  NOK = 'NOK',
}

/**
 * Create payment request
 * The `CreatePaymentRequest` object.
 */
export interface CreatePaymentRequest {
  /** Amount object */
  amount: Amount;
  /**
   * For special cases. The sale unit must be configured by Vipps.
   * We strongly recommend using "reserve capture" in all situations.
   * Default is `false`.
   * @default false
   */
  directCapture?: boolean;
  /** Target customer */
  customer?: Customer;
  /**
   * The type of customer interaction that triggers the purchase.
   * `CUSTOMER_PRESENT` means that the customer is physically present at the
   * point of sale when the payment is made, typically in a store.
   * @default "CUSTOMER_NOT_PRESENT"
   * @example "CUSTOMER_NOT_PRESENT"
   */
  customerInteraction?: 'CUSTOMER_PRESENT' | 'CUSTOMER_NOT_PRESENT';
  /** Additional compliance data related to the transaction. */
  industryData?: IndustryData;
  paymentMethod: PaymentMethod;
  profile?: ProfileRequest;
  /** A reference */
  reference: Reference;
  /**
   * The URL the user is returned to after the payment session.
   * The URL has to use the `https://` scheme or a custom URL scheme.
   * @example "https://example.com/redirect?orderId=acme-shop-123-order123abc"
   */
  returnUrl?: string;
  /**
   * The flow for bringing to user to the Vipps Wallet payment confirmation screen.
   * If `userFlow` is `PUSH_MESSAGE`, a valid value for `customer.phoneNumber` is required.
   * @example "NATIVE_REDIRECT"
   */
  userFlow: 'PUSH_MESSAGE' | 'NATIVE_REDIRECT' | 'WEB_REDIRECT' | 'QR';
  /**
   * The payment will expire at the given date and time.
   * The format must adhere to RFC 3339.
   * The value must be more than 10 minutes and less than 28 days in the future.
   * Can only be combined with `userFlow: PUSH_MESSAGE` or `userFlow: QR`.
   * @pattern ^((?:(\d{4}-\d{2}-\d{2})(T|t)(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|z|([+-](?:2[0-3]|[01][0-9]):[0-5][0-9])))$
   * @example "2023-02-26T17:32:28Z"
   */
  expiresAt?: string | null;
  /**
   * Optional setting that is only applicable when `userFlow` is set to `QR`.
   * This is used to set the format for the QR code.
   */
  qrFormat?: {
    /**
     * If `userFlow` is `QR` and `qrFormat` is not set, the QR code image will be returned as `SVG+XML`, by default.
     * @default "IMAGE/SVG+XML"
     * @example "IMAGE/SVG+XML"
     */
    format: 'TEXT/TARGETURL' | 'IMAGE/SVG+XML' | 'IMAGE/PNG';
    /**
     * For example, if the value is 200, then 200x200 px is set as the dimension for the QR code.
     * This is only applicable when the format is set to `PNG`. If not set, the default is 1024.
     * @min 100
     * @max 2000
     * @example 1024
     */
    size?: number | null;
  };
  /**
   * The payment description summary that will be provided to the user through the app, the merchant portal, and the settlement files.
   * @minLength 3
   * @maxLength 100
   */
  paymentDescription?: string;
}

/**
 * Create payment response
 * The `CreatePaymentResponse` object.
 */
export interface CreatePaymentResponse {
  /**
   * The URL to which the user is redirected when continuing the payment for `NATIVE_REDIRECT` and `WEB_REDIRECT`.
   * When `userFlow` is `QR`, a link to the QR image (or the target URL) will be returned.
   * Nothing will be returned when `userFlow` is `PUSH_MESSAGE`.
   * @format uri
   * @example "https://landing.vipps.no?token=abc123"
   */
  redirectUrl?: string;
  /** A reference */
  reference: Reference;
}

/**
 * Get payment response
 * The `GetPaymentResponse` object.
 */
export interface GetPaymentResponse {
  aggregate: Aggregate;
  /** Amount object */
  amount: Amount;
  /**
   * State of the Payment.
   * One of:
   * - CREATED : User has not yet acted upon the payment
   * - ABORTED : User has aborted the payment before authorization
   * - EXPIRED: User did not act on the payment within the payment expiration time
   * - AUTHORIZED : User has approved the payment
   * - TERMINATED : Merchant has terminated the payment via the cancelPayment endpoint
   */
  state: State;
  paymentMethod: PaymentMethodResponse;
  profile: ProfileResponse;
  /** Reference value for a payment defined by Vipps. */
  pspReference: PspReference;
  /**
   * The URL you should redirect the user to to continue with the payment.
   * @format uri
   * @example "https://landing.vipps.no?token=abc123"
   */
  redirectUrl?: string;
  /** A reference */
  reference: Reference;
}

/** Additional compliance data related to the transaction. */
export interface IndustryData {
  /**
   * Airline related data.
   * If present, `passengerName`, `airlineCode`, `airlineDesignatorCode`, and `agencyInvoiceNumber` are all required.
   */
  airlineData?: AirlineData;
}

/**
 * AirlineData
 * Airline related data.
 * If present, `passengerName`, `airlineCode`, `airlineDesignatorCode`, and `agencyInvoiceNumber` are all required.
 */
export interface AirlineData {
  /**
   * Reference number for the invoice, issued by the agency.
   * @minLength 1
   * @maxLength 6
   */
  agencyInvoiceNumber: string;
  /**
   * IATA 3-digit accounting code (PAX); numeric. It identifies the carrier. eg KLM = 074
   * @format IATA 3-digit accounting code (PAX)
   * @minLength 3
   * @maxLength 3
   * @example "074"
   */
  airlineCode: string;
  /**
   * IATA 2-letter accounting code (PAX); alphabetical. It identifies the carrier. Eg KLM = KL
   * @format IATA 2-letter airline code
   * @minLength 2
   * @maxLength 2
   * @example "KL"
   */
  airlineDesignatorCode: string;
  /**
   * Passenger name, initials, and a title.
   * @format last name + first name or initials + title.
   * @minLength 1
   * @maxLength 49
   * @example "FLYER / MARY MS."
   */
  passengerName: string;
  /**
   * The ticket's unique identifier.
   * @minLength 1
   * @maxLength 150
   */
  ticketNumber?: string;
}

/** Aggregate */
export interface Aggregate {
  /** Amount object */
  authorizedAmount: Amount;
  /** Amount object */
  cancelledAmount: Amount;
  /** Amount object */
  capturedAmount: Amount;
  /** Amount object */
  refundedAmount: Amount;
}

/** CaptureModificationRequest */
export interface CaptureModificationRequest {
  /** Amount object */
  modificationAmount: Amount;
}

/** RefundModificationRequest */
export interface RefundModificationRequest {
  /** Amount object */
  modificationAmount: Amount;
}

/** ModificationResponse */
export interface ModificationResponse {
  /** Amount object */
  amount: Amount;
  /**
   * State of the Payment.
   * One of:
   * - CREATED : User has not yet acted upon the payment
   * - ABORTED : User has aborted the payment before authorization
   * - EXPIRED: User did not act on the payment within the payment expiration time
   * - AUTHORIZED : User has approved the payment
   * - TERMINATED : Merchant has terminated the payment via the cancelPayment endpoint
   */
  state: State;
  aggregate: Aggregate;
  /** Reference value for a payment defined by Vipps. */
  pspReference: PspReference;
  /** A reference */
  reference: Reference;
}

/**
 * ReferenceType
 * A reference
 * @minLength 8
 * @maxLength 50
 * @pattern ^[a-zA-Z0-9-]{8,50}$
 * @example "reference-string"
 */
export type Reference = string;

/**
 * PspReference
 * Reference value for a payment defined by Vipps.
 */
export type PspReference = string;

/** Address */
export interface Address {
  /** @example "Oslo" */
  city: string;
  /**
   * Country code according to ISO 3166-2 (two capital letters).
   * @pattern ^[A-Z]{2}$
   * @example "NO"
   */
  country: string;
  /**
   * Unique ID of the address, always provided in response from Vipps.
   * @format uuid
   */
  id?: string;
  /** Array of addressLines, for example street name, number, etc. */
  lines: string[];
  /**
   * Postcode of the address in local country format.
   * @example "0154"
   */
  postCode: string;
}

/** Profile */
export interface ProfileRequest {
  /** A space-separated string list of requested user information in accordance with the OpenID Connect specification. */
  scope?: string;
}

/** Profile */
export interface ProfileResponse {
  /**
   * If `profile.scope` was requested in `createPayment` this value will populate once
   * `state` is `AUTHORIZED`. This can be used towards the Vipps Login Userinfo endpoint
   * to fetch requested user data.
   */
  sub?: string;
}

/** PaymentMethod */
export interface PaymentMethod {
  /**
   * The paymentMethod type to be performed.
   * `CARD` has to be combined with a `userFlow` of `WEB_REDIRECT`.
   */
  type: PaymentMethodType;
}

/** PaymentMethodResponse */
export interface PaymentMethodResponse {
  /**
   * The paymentMethod type to be performed.
   * `CARD` has to be combined with a `userFlow` of `WEB_REDIRECT`.
   */
  type: PaymentMethodType;
  /**
   * @minLength 6
   * @maxLength 6
   * @example "540185"
   */
  cardBin?: string;
}

/**
 * The paymentMethod type to be performed.
 * `CARD` has to be combined with a `userFlow` of `WEB_REDIRECT`.
 * @example "WALLET"
 */
export enum PaymentMethodType {
  WALLET = 'WALLET',
  CARD = 'CARD',
}

/** PaymentAdjustment */
export interface PaymentAdjustment {
  /** Amount object */
  modificationAmount: Amount;
  /** A reference */
  modificationReference: Reference;
}

/** PaymentEvent */
export interface PaymentEvent {
  /** A reference */
  reference: Reference;
  /** Reference value for a payment defined by Vipps. */
  pspReference: PspReference;
  /** @example "AUTHORIZED" */
  name?: 'CREATED' | 'ABORTED' | 'EXPIRED' | 'CANCELLED' | 'CAPTURED' | 'REFUNDED' | 'AUTHORIZED' | 'TERMINATED';
  /**
   * @deprecated
   * @example "CREATE"
   */
  paymentAction: 'CREATE' | 'ABORT' | 'EXPIRE' | 'CANCEL' | 'CAPTURE' | 'REFUND' | 'AUTHORISE' | 'TERMINATE';
  /** Amount object */
  amount: Amount;
  /** @format date-time */
  timestamp: string;
  /**
   * @deprecated
   * @format date-time
   */
  processedAt?: string;
  /** The Idempotency key of the request. */
  idempotencyKey?: string | null;
  /** The outcome of the event */
  success: boolean;
}

/** Problem */
export interface Problem {
  /**
   * A URI reference that identifies the problem type.
   * @format uri
   */
  type: string;
  /** A short, human-readable summary of the problem type. It will not change from occurrence to occurrence of the problem. */
  title: string;
  /** A human-readable explanation specific to this occurrence of the problem. */
  detail?: string;
  /** An id that can be used to facilitate in tracing the error. */
  traceId: string;
}

/**
 * State
 * State of the Payment.
 * One of:
 * - CREATED : User has not yet acted upon the payment
 * - ABORTED : User has aborted the payment before authorization
 * - EXPIRED: User did not act on the payment within the payment expiration time
 * - AUTHORIZED : User has approved the payment
 * - TERMINATED : Merchant has terminated the payment via the cancelPayment endpoint
 */
export enum State {
  CREATED = 'CREATED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
  AUTHORIZED = 'AUTHORIZED',
  TERMINATED = 'TERMINATED',
}

/** ForceApprove */
export interface ForceApprove {
  /** Target customer */
  customer?: Customer;
  token?: string;
}
