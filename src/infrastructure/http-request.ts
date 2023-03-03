import { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';
import { VippsConfiguration } from '../@types/vipps-configuration.types';

const VIPPS_SYSTEM_NAME = 'Vipps Node SDK';
const VIPPS_SYSTEM_VERSION = '0.9.0';

const makeRequest = <TI, TR>(
  configuration: VippsConfiguration,
  method: string,
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: TI,
) => {
  const commonHeaders: OutgoingHttpHeaders = {
    'Content-type': 'application/json; charset="utf-8"',
    'Ocp-Apim-Subscription-Key': configuration.subscriptionKey,
    'Merchant-Serial-Number': configuration.merchantSerialNumber,
    'Vipps-System-Name': VIPPS_SYSTEM_NAME,
    'Vipps-System-Version': VIPPS_SYSTEM_VERSION,
    'Vipps-System-Plugin-Name': configuration.pluginName,
    'Vipps-System-Plugin-Version': configuration.pluginVersion,
  };

  const options: https.RequestOptions = {
    method,
    // TODO: apitest.vipps.no for testmode
    hostname: configuration.useTestMode ? 'ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net' : 'api.vipps.no',
    path,
    headers: { ...headers, ...commonHeaders },
  };

  return new Promise<TR>((resolve, reject) => {
    const chunks: any[] = [];
    const req = https
      // Maybe use retries here depending on status code and/or error?
      .request(options, (resp) => {
        resp.on('data', (chunk) => {
          chunks.push(chunk);
        });
        resp.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString();
            if (!resp.statusCode || resp.statusCode < 200 || resp.statusCode > 299) {
              const error = new Error(`statusCode=${resp.statusCode}, contents=${body}`);
              reject(error);
            } else {
              resolve(JSON.parse(body));
            }
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', (err) => {
        reject(err);
      });

    if (requestData) {
      req.write(JSON.stringify(requestData));
    }

    req.end();
  });
};

export const get = <TR>(configuration: VippsConfiguration, path: string, headers: OutgoingHttpHeaders): Promise<TR> =>
  makeRequest<void, TR>(configuration, 'GET', path, headers, undefined);

export const post = <TI, TR>(
  configuration: VippsConfiguration,
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: TI,
) => makeRequest<TI, TR>(configuration, 'POST', path, headers, requestData);
