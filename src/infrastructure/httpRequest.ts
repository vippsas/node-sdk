import { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';

const makeRequest = (
  method: string,
  hostname: string,
  port: number,
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: string,
): Promise<string> => {
  const options: https.RequestOptions = {
    method,
    hostname,
    port,
    path,
    headers,
  };

  return new Promise<string>((resolve, reject) => {
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
              const error: Error = { name: `statusCode=${resp.statusCode}`, message: `contents=${body}` };
              reject(error);
            } else {
              resolve(body);
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
      req.write(requestData);
    }

    req.end();
  });
};

export const get = (hostname: string, port: number, path: string, headers: OutgoingHttpHeaders): Promise<string> =>
  makeRequest('GET', hostname, port, path, headers, undefined);

export const post = (
  hostname: string,
  port: number,
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: string,
): Promise<string> => makeRequest('POST', hostname, port, path, headers, requestData);
