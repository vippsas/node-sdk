import { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';
import { VippsConfigurationOptions } from './VippsConfigurationOptions';

const makeRequest = <TI, TR>(
  configoptions: VippsConfigurationOptions,
  method: string,
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: TI,
) => {
  // TODO: apitest.vipps.no for testmode
  const hostname = configoptions.useTestMode ? 'ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net' : 'api.vipps.no';

  const commonHeaders: OutgoingHttpHeaders = {
    'Content-type': 'application/json; charset="utf-8"',
    'Ocp-Apim-Subscription-Key': configoptions.subscriptionKey,
    'Merchant-Serial-Number': configoptions.merchantSerialNumber,
    'Vipps-System-Name': 'Vipps node SDK',
    'Vipps-System-Version': '0.9.0',
    'Vipps-System-Plugin-Name': configoptions.pluginName,
    'Vipps-System-Plugin-Version': configoptions.pluginVersion,
  };

  const joinedheaders: OutgoingHttpHeaders = { ...headers, ...commonHeaders };

  const options: https.RequestOptions = {
    method,
    hostname,
    path,
    headers: joinedheaders,
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

export const get = <TR>(
  configoptions: VippsConfigurationOptions,
  path: string,
  headers: OutgoingHttpHeaders,
): Promise<TR> => makeRequest<void, TR>(configoptions, 'GET', path, headers, undefined);

export const post = <TI, TR>(
  configoptions: VippsConfigurationOptions,
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: TI,
) => makeRequest<TI, TR>(configoptions, 'POST', path, headers, requestData);
