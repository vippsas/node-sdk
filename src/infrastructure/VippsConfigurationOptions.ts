export interface ShippingDetails {
  /** Example: "My plugin" */
  pluginName: string;
  /** Example: "1.0.0" */
  pluginVersion: string;
  /** Client ID for the merchant (the "username"). Found in the Vipps portal. Example: "fb492b5e-7907-4d83-bc20-c7fb60ca35de". */
  clientId: string;
  /** Client Secret for the merchant (the "password"). Found in the Vipps portal. Example: "Y8Kteew6GE3ZmeycEt6egg==" */
  clientSecret: string;
  /** Vipps Subscription key for the API product. Found in the Vipps portal. Example: "0f14ebcab0eb4b29ae0cb90d91b4a84a". */
  subscriptionKey: string;
  /** Vipps assigned unique number for a merchant. Found in the Vipps portal. Example: "123456". */
  merchantSerialNumber: string;
  /** If true, uses Vipps test environment */
  useTestMode: boolean;
}
