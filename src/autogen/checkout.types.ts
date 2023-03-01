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

/** Amounts are specified in minor units. For Norwegian kroner (NOK) that means 1 kr = 100 øre. Example: 499 kr = 49900 øre. */
export interface Amount {
  /**
   * Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int32
   * @min 0
   */
  value?: number;
  /** The currency identifier according to ISO 4217. Example: "NOK" */
  currency?: string;
}

/** Defines the details of the billing */
export interface BillingDetails {
  /** Example: "Ada" */
  firstName?: string;
  /** Example: "Lovelace" */
  lastName?: string;
  /** Example: "user@example.com" */
  email?: string;
  /** If no country code is provided, defaults to Norway (47). Example: "4791234567" */
  phoneNumber?: string;
  /** Example: "Robert Levins gate 5" */
  streetAddress?: string | null;
  /** Example: "0154" */
  postalCode?: string | null;
  /** Example: "Oslo" */
  city?: string | null;
  /** The ISO-3166-1 Alpha-2 representation of the country. Example: "NO" */
  country?: string | null;
}

export interface CheckoutConfig {
  /** If customer is physically present: "customer_present", otherwise: "customer_not_present". */
  customerInteraction?: CustomerInteraction | null;
  /** Adjust the fields and values present in the Checkout. */
  elements?: Elements | null;
  /** Countries to allow during session */
  countries?: Countries | null;
  /** One of the following: "WEB_REDIRECT", "NATIVE_REDIRECT". To ensure having a return URL based on an app URL, use "NATIVE_REDIRECT". */
  userFlow?: UserFlow | null;
  /** Requires the customer to consent to share their email and openid sub with the merchant to be able to make a wallet payment (default: false). */
  requireUserInfo?: boolean | null;
  /** If used, displays a checkbox that can be used to ask for extra consent. */
  customConsent?: CustomConsent | null;
}

/** Information about the merchant system. */
export interface CheckoutSessionThirdPartyInformationHeaders {
  /** The name of the ecommerce solution. Example: "Acme Enterprises Ecommerce DeLuxe". */
  'vipps-System-Name'?: string;
  /** The version number of the ecommerce solution. Example: "3.1.2". */
  'vipps-System-Version'?: string;
  /** The name of the ecommerce plugin. Example: "acme-webshop". */
  'vipps-System-Plugin-Name'?: string;
  /** The version number of the ecommerce plugin. Example: "4.5.6". */
  'vipps-System-Plugin-Version'?: string;
}

export interface Countries {
  /** List of allowed countries in ISO-3166 Alpha 2. If specified, the customer will only be able to select these countries. Example ["NO", "SE", "DK"] */
  supported?: string[];
}

/** If used, displays a checkbox that can be used to ask for extra consent. */
export interface CustomConsent {
  /** Text displayed next to the checkbox. This text can contain up to one link in markdown format like this: [linkText](https://example.com) */
  text?: string;
  /** Whether box has to be checked to complete the checkout. */
  required?: boolean;
}

export enum CustomerInteraction {
  CUSTOMER_PRESENT = 'CUSTOMER_PRESENT',
  CUSTOMER_NOT_PRESENT = 'CUSTOMER_NOT_PRESENT',
}

export enum Elements {
  Full = 'Full',
  PaymentAndContactInfo = 'PaymentAndContactInfo',
  PaymentOnly = 'PaymentOnly',
}

export enum ExternalSessionState {
  SessionCreated = 'SessionCreated',
  PaymentInitiated = 'PaymentInitiated',
  SessionExpired = 'SessionExpired',
  PaymentSuccessful = 'PaymentSuccessful',
  PaymentTerminated = 'PaymentTerminated',
}

/** Configuration required to enable Helthjem logistics options */
export interface Helthjem {
  /** The Username provided to you by Helthjem */
  username?: string;
  /** The Password provided to you by Helthjem */
  password?: string;
  /**
   * The ShopId provided to you by Helthjem
   * @format int32
   */
  shopId?: number;
}

export type HelthjemLogisticsOption = LogisticsOptionBase & {
  type?: HelthjemLogisticsType | null;
  customType?: string | null;
  /**
   * @default "HELTHJEM"
   * @pattern HELTHJEM
   */
  brand: string;
};

export enum HelthjemLogisticsType {
  HOME_DELIVERY = 'HOME_DELIVERY',
  PICKUP_POINT = 'PICKUP_POINT',
}

/** Request to set up a Checkout session */
export interface InitiateSessionRequest {
  merchantInfo?: PaymentMerchantInfo;
  transaction?: PaymentTransaction;
  logistics?: Logistics | null;
  /** If customer information is known, it can be prefilled. */
  prefillCustomer?: PrefillCustomer | null;
  configuration?: CheckoutConfig | null;
}

/** Response from initiating a session. */
export interface InitiateSessionResponse {
  /** The token to be provided to Checkout. Example: "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJUdHF1Y3I5ZDdKRHZ6clhYWTU1WUZRIiwic2Vzc2lvblBvbGxpbmdVUkwiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvY2hlY2tvdXQvc2Vzc2lvbi9UdHF1Y3I5ZDdKRHZ6clhYWTU1WUZRIn0.ln7VzZkNvUGu0HhyA_a8IbXQN35WhDBmCYC9IvyYL-I" */
  token?: string;
  /** The URL of the checkout frontend. Example: "https://vippscheckout.vipps.no/v1/". */
  checkoutFrontendUrl?: string;
  /** The URL to poll for session information. Example: "https://api.vipps.no/checkout/v1/session/31gf1g413121". */
  pollingUrl?: string;
}

/** Configuration required to enable Instabox logistics options */
export interface Instabox {
  /** The client id provided to you by Instabox */
  clientId?: string;
  /** The client secret provided to you by Instabox */
  clientSecret?: string;
}

/** Details needed to book an instabox order */
export interface InstaboxBookingDetails {
  /** Identifies when the delivery options were fetched */
  availabilityToken?: string;
  /** Identifies the service (For example "EXPRESS") */
  serviceType?: string;
  /** Identifies the location */
  sortCode?: string;
}

export type InstaboxLogisticsOption = LogisticsOptionBase & {
  type?: InstaboxLogisticsType | null;
  customType?: string | null;
  /**
   * @default "INSTABOX"
   * @pattern INSTABOX
   */
  brand: string;
};

export enum InstaboxLogisticsType {
  HOME_DELIVERY = 'HOME_DELIVERY',
  PICKUP_POINT = 'PICKUP_POINT',
}

export interface Integrations {
  /** Configuration required to enable Porterbuddy logistics options */
  porterbuddy?: Porterbuddy | null;
  /** Configuration required to enable Instabox logistics options */
  instabox?: Instabox | null;
  /** Configuration required to enable Helthjem logistics options */
  helthjem?: Helthjem | null;
}

/**
 * If both dynamic and fixed options are specified, dynamic options is provided to the user.
 * If no DynamicOptionsCallback is provided, only fixed logistics options will be used.
 * When using dynamic shipping we recommend that you define logistics.fixedOptions as a backup.
 * If the callback does not resolve successfully within 8 seconds, returns null or an empty list the system will fall back to static options.
 * If no fallback options are provided, the user will be presented with an error and will not be able to continue with the checkout.
 */
export interface Logistics {
  /** Merchant's Callback URL for providing dynamic logistics options based on customer address. Example: "https://example.com/vipps/dynamiclogisticsoption". Can not be used with AddressFields set to false. */
  dynamicOptionsCallback?: string | null;
  /** Fixed list of logistics options. */
  fixedOptions?:
    | (
        | PostenLogisticsOption
        | PostnordLogisticsOption
        | PorterbuddyLogisticsOption
        | InstaboxLogisticsOption
        | HelthjemLogisticsOption
        | OtherLogisticsOption
      )[]
    | null;
  /** Some optional checkout features require carrier-specific configuration. Can not be used with AddressFields set to false. */
  integrations?: Integrations | null;
}

export interface LogisticsOptionBase {
  /** Amounts are specified in minor units. For Norwegian kroner (NOK) that means 1 kr = 100 øre. Example: 499 kr = 49900 øre. */
  amount?: Amount;
  /**
   * @minLength 1
   * @maxLength 200
   */
  id?: string;
  /**
   * @format int32
   * @min 0
   */
  priority?: number;
  isDefault?: boolean;
  description?: string | null;
}

/** Headers required to retrieve an access token. */
export interface MerchantAuthInfoHeaders {
  /**
   * Client ID for the merchant (the "username"). Found in the Vipps portal. Example: "fb492b5e-7907-4d83-bc20-c7fb60ca35de".
   * @minLength 1
   */
  client_id: string;
  /**
   * Client Secret for the merchant (the "password"). Found in the Vipps portal. Example: "Y8Kteew6GE3ZmeycEt6egg==".
   * @minLength 1
   */
  client_secret: string;
  /**
   * Vipps Subscription key for the API product. Found in the Vipps portal. Example: "0f14ebcab0eb4b29ae0cb90d91b4a84a".
   * @minLength 1
   */
  'ocp-Apim-Subscription-Key': string;
  /**
   * Vipps assigned unique number for a merchant. Found in the Vipps portal. Example: "123456".
   * @minLength 1
   */
  'merchant-Serial-Number': string;
}

/** Information about the customer address used when retrieving dynamic logistics options. */
export interface MerchantLogisticsCallbackRequestBody {
  /** Example: "Robert Levins gate 5" */
  streetAddress?: string;
  /** Example: "0154" */
  postalCode?: string;
  /** Example: "Oslo" */
  region?: string;
  /** The ISO-3166-1 Alpha-2 representation of the country. Example: "NO" */
  country?: string;
}

export interface OrderBottomLine {
  /**
   * The currency identifier according to ISO 4217. Example: "NOK".
   * @minLength 3
   * @maxLength 3
   */
  currency: string;
  /**
   * Tip amount for the order. Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int64
   */
  tipAmount?: number | null;
  /**
   * Amount paid by gift card or coupon. Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int64
   */
  giftCardAmount?: number | null;
  /** Identifier of the terminal / point of sale. */
  terminalId?: string | null;
}

export interface OrderLine {
  /**
   * The name of the product in the order line.
   * @minLength 1
   * @maxLength 2048
   */
  name: string;
  /**
   * The product ID.
   * @minLength 1
   * @maxLength 255
   */
  id: string;
  /**
   * Total amount of the order line, including tax and discount. Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int64
   * @min 0
   */
  totalAmount: number;
  /**
   * Total amount of order line with discount excluding tax. Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int64
   * @min 0
   */
  totalAmountExcludingTax: number;
  /**
   * Total tax amount paid for the order line. Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int64
   * @min 0
   */
  totalTaxAmount: number;
  /**
   * Tax percentage for the order line.
   * @format int32
   * @min 0
   * @max 100
   */
  taxPercentage: number;
  /** If no quantity info is provided the order line will default to 1 pcs. */
  unitInfo?: OrderUnitInfo | null;
  /**
   * Total discount for the order line. Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int64
   */
  discount?: number | null;
  /** URL linking back to the product at the merchant. */
  productUrl?: string | null;
  /** Flag for marking the orderline as returned. This will make it count negative towards all the sums in BottomLine. */
  isReturn?: boolean | null;
  /** Flag for marking the orderline as a shipping line. This will be shown differently in the app. */
  isShipping?: boolean | null;
}

export interface OrderSummary {
  /**
   * The order lines contain descriptions of each item present in the order.
   * @minItems 1
   */
  orderLines: OrderLine[];
  /** Contains information regarding the order as a whole. */
  orderBottomLine?: OrderBottomLine;
}

export interface OrderUnitInfo {
  /**
   * Total price per unit, including tax and excluding discount. Must be in Minor Units. The smallest unit of a currency. Example 100 NOK = 10000.
   * @format int64
   * @min 0
   */
  unitPrice: number;
  /** Quantity given as a integer or fraction (only for cosmetics). */
  quantity?: string;
  /** Available units for quantity. Will default to PCS if not set. */
  quantityUnit: QuantityUnit;
}

export type OtherLogisticsOption = LogisticsOptionBase & {
  /**
   * @minLength 1
   * @maxLength 200
   */
  title: string;
  /**
   * @default "OTHER"
   * @pattern OTHER
   */
  brand: string;
};

export interface PaymentMerchantInfo {
  /** Complete URL for receiving callbacks. Example: "https://exmaple.com/vipps/payment-callback/ */
  callbackUrl?: string;
  /**
   * Complete URL for redirecting customers to when the checkout is finished. Example: "https://example.com/vipps".
   * @minLength 1
   */
  returnUrl: string;
  /** The token will be supplied by the callback to the merchant as a header. Example: "iOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImllX3FXQ1hoWHh0MXpJ". */
  callbackAuthorizationToken?: string;
  /** Complete URL to the merchant's terms and conditions. Example: "https://example.com/vipps/termsAndConditions". */
  termsAndConditionsUrl?: string | null;
}

export enum PaymentMethod {
  Wallet = 'Wallet',
  Card = 'Card',
  Swish = 'Swish',
}

export enum PaymentState {
  CREATED = 'CREATED',
  AUTHORIZED = 'AUTHORIZED',
  TERMINATED = 'TERMINATED',
}

export interface PaymentTransaction {
  /** Amounts are specified in minor units. For Norwegian kroner (NOK) that means 1 kr = 100 øre. Example: 499 kr = 49900 øre. */
  amount?: Amount;
  /**
   * The merchant's unique reference for the transaction. Also known as OrderId. Example: "acme-shop-123-order123abc". See https://vippsas.github.io/vipps-developer-docs/docs/vipps-developers/common-topics/orderid
   * @minLength 8
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9]*$
   */
  reference?: string;
  /**
   * Description visible to the customer during payment. Example: "One pair of Vipps socks".
   * @minLength 3
   * @maxLength 100
   */
  paymentDescription?: string;
  /** Contain descriptions of each item present in the order, and an order bottom line for information regarding the order as a whole. */
  orderSummary?: OrderSummary | null;
}

/** The pickup point the customer selected . */
export interface PickupPoint {
  /** Pickup point id provided by the carrier. Example: 121648 */
  id?: string;
  /** Pickup point name. Example: Extra Eiganes */
  name?: string;
  /** Pickup point's street address. Example: VITAMINVEIEN 7 */
  address?: string;
  /** Pickup point's postal code. Example: 0485 */
  postalCode?: string;
  /** Pickup point's city. Example: OSLO */
  city?: string;
  /** Pickup point's country. Example: NO */
  country?: string;
  /** Pickup point's opening hours. Example: Man-Søn: 1000-2000 */
  openingHours?: string[] | null;
  /** Instabox details */
  instabox?: InstaboxBookingDetails | null;
}

/** Configuration required to enable Porterbuddy logistics options */
export interface Porterbuddy {
  /** The public key provided to you by Porterbuddy */
  publicToken?: string;
  /** The API key provided to you by Porterbuddy */
  apiKey?: string;
  /** Information about the sender */
  origin?: PorterbuddyOrigin;
}

export type PorterbuddyLogisticsOption = LogisticsOptionBase & {
  type?: PorterbuddyLogisticsType | null;
  customType?: string | null;
  /**
   * @default "PORTERBUDDY"
   * @pattern PORTERBUDDY
   */
  brand: string;
};

export enum PorterbuddyLogisticsType {
  HOME_DELIVERY = 'HOME_DELIVERY',
}

/** Details about the sender of the Porterbuddy parcels */
export interface PorterbuddyOrigin {
  /** The name of your store */
  name?: string;
  /** Your email address where Porterbuddy booking confirmation will be sent */
  email?: string;
  /** Your phone number where Porterbuddy may send you important messages. Format must be MSISDN (including country code). Example: "4791234567" */
  phoneNumber?: string;
  /** Your address where Porterbuddy will pick up the parcels */
  address?: PorterbuddyOriginAddress;
}

export interface PorterbuddyOriginAddress {
  /** Example: "Robert Levins gate 5" */
  streetAddress?: string;
  /** Example: "0154" */
  postalCode?: string;
  /** Example: "Oslo" */
  city?: string;
  /** The ISO-3166-1 Alpha-2 representation of the country. Example: "NO" */
  country?: string;
}

export type PostenLogisticsOption = LogisticsOptionBase & {
  type?: PostenLogisticsType | null;
  customType?: string | null;
  /**
   * @default "POSTEN"
   * @pattern POSTEN
   */
  brand: string;
};

export enum PostenLogisticsType {
  MAILBOX = 'MAILBOX',
  PICKUP_POINT = 'PICKUP_POINT',
  HOME_DELIVERY = 'HOME_DELIVERY',
}

export type PostnordLogisticsOption = LogisticsOptionBase & {
  type?: PostnordLogisticsType | null;
  customType?: string | null;
  /**
   * @default "POSTNORD"
   * @pattern POSTNORD
   */
  brand: string;
};

export enum PostnordLogisticsType {
  PICKUP_POINT = 'PICKUP_POINT',
  HOME_DELIVERY = 'HOME_DELIVERY',
}

/**
 * Information about the customer to be prefilled
 *
 * If any of the customer information is invalid such as the phone number,
 * the customer will be prompted to input new user information.
 */
export interface PrefillCustomer {
  /** Example: "Ada" */
  firstName?: string;
  /** Example: "Lovelace" */
  lastName?: string;
  /** Example: "user@example.com" */
  email?: string;
  /** Format must be MSISDN (including country code). Example: "4791234567" */
  phoneNumber?: string;
  /** Example: "Robert Levins gate 5" */
  streetAddress?: string;
  /** Example: "Oslo" */
  city?: string;
  /** Example: "0154" */
  postalCode?: string;
  /** The ISO-3166-1 Alpha-2 representation of the country. Example: "NO" */
  country?: string;
}

export enum QuantityUnit {
  PCS = 'PCS',
  KG = 'KG',
  KM = 'KM',
  MINUTE = 'MINUTE',
  LITRE = 'LITRE',
}

/** Defines the details of the payment. */
export interface ResponsePaymentDetails {
  amount?: Amount;
  state?: PaymentState;
  aggregate?: TransactionAggregate | null;
}

/** Session information */
export interface SessionResponse {
  /** The Id of the session. Example: "v52EtjZriRmGiKiAKHByK2". */
  sessionId?: string;
  /** The merchant's serial number. Example: "123456" */
  merchantSerialNumber?: string | null;
  /** The merchant's unique reference for the transaction. Also known as OrderId. Example: "acme-shop-123-order123abc". See https://vippsas.github.io/vipps-developer-docs/docs/vipps-developers/common-topics/orderid */
  reference?: string;
  /** The state of the session. Example: "SessionStarted". The state of the payment is in PaymentDetails.State. */
  sessionState?: ExternalSessionState;
  paymentMethod?: PaymentMethod | null;
  paymentDetails?: ResponsePaymentDetails | null;
  userInfo?: UserInfo | null;
  shippingDetails?: ShippingDetails | null;
  billingDetails?: BillingDetails | null;
  customConsentProvided?: boolean | null;
}

/** Defines the details of the shipping */
export interface ShippingDetails {
  /** Example: "Ada" */
  firstName?: string | null;
  /** Example: "Lovelace" */
  lastName?: string | null;
  /** Example: "user@example.com" */
  email?: string | null;
  /** If no country code is provided, defaults to Norway (47). Example: "4791234567" */
  phoneNumber?: string | null;
  /** Example: "Robert Levins gate 5" */
  streetAddress?: string | null;
  /** Example: "0154" */
  postalCode?: string | null;
  /** Example: "Oslo" */
  city?: string | null;
  /** The ISO-3166-1 Alpha-2 representation of the country. Example: "NO" */
  country?: string | null;
  /** Id of the shipping method. Example: "123abc" */
  shippingMethodId?: string | null;
  pickupPoint?: PickupPoint | null;
}

/** Defines the details of the transaction */
export interface TransactionAggregate {
  cancelledAmount?: Amount | null;
  capturedAmount?: Amount | null;
  refundedAmount?: Amount | null;
  authorizedAmount?: Amount | null;
}

export enum UserFlow {
  WEB_REDIRECT = 'WEB_REDIRECT',
  NATIVE_REDIRECT = 'NATIVE_REDIRECT',
}

/** Data from the UserInfo endpoint. Will only be present if UserInfo flow is used. */
export interface UserInfo {
  /** The openid sub that uniquely identifies a Vipps user. */
  sub?: string;
  /** Example: "user@example.com" */
  email?: string | null;
}
