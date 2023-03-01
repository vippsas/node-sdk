export const CLIENT_ID = process.env.CLIENT_ID || '<specify client id for local testing here or use env var>';
export const CLIENT_SECRET = process.env.CLIENT_SECRET || '<specify client secret for local testing or use env var>';
export const SUBSCRIPTION_KEY =
  process.env.SUBSCRIPTION_KEY || '<specify apim subscription key for local testing or use env var>';
export const PORT = process.env.PORT || 4241;
export const PORTERBUDDY_API_KEY = process.env.PORTERBUDDY_API_KEY || '';
export const PORTERBUDDY_PUBLIC_TOKEN = process.env.PORTERBUDDY_PUBLIC_TOKEN || '';

export const SHIPPING_ENABLED = process.env.SHIPPING_ENABLED ? process.env.SHIPPING_ENABLED === 'true' : true;

export const INSTABOX_CLIENT_ID = process.env.INSTABOX_CLIENT_ID || '';
export const INSTABOX_CLIENT_SECRET = process.env.INSTABOX_CLIENT_SECRET || '';

export const HELTHJEM_USERNAME = process.env.HELTHJEM_USERNAME || '';
export const HELTHJEM_PASSWORD = process.env.HELTHJEM_PASSWORD || '';
export const HELTHJEM_SHOPID = process.env.HELTHJEM_SHOPID || 0;

export const MERCHANT_SERIAL_NUMBER =
  process.env.MERCHANT_SERIAL_NUMBER || '<specify merchant serial number for local testing or use env var>';

export const MERCHANT_HEADERS = {
  'Content-type': 'application/json; charset="utf-8"',
  'Vipps-System-Name': 'direct',
  'Vipps-System-Version': '1.0',
  'Vipps-System-Plugin-Name': 'direct',
  'Vipps-System-Plugin-Version': '1.0',
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
  'Merchant-Serial-Number': MERCHANT_SERIAL_NUMBER,
};
