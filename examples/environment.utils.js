const CLIENT_ID = process.env.CLIENT_ID || '<specify client id for local testing here or use env var>';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '<specify client secret for local testing or use env var>';
const SUBSCRIPTION_KEY =
  process.env.SUBSCRIPTION_KEY || '<specify apim subscription key for local testing or use env var>';

const MERCHANT_SERIAL_NUMBER =
  process.env.MERCHANT_SERIAL_NUMBER || '<specify merchant serial number for local testing or use env var>';

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  SUBSCRIPTION_KEY,
  MERCHANT_SERIAL_NUMBER,
  SUBSCRIPTION_KEY,
};
