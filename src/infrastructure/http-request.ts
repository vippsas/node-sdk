import { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';

const makeRequest = <TI, TR>(
  hostname: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: TI,
) => {
  const options: https.RequestOptions = {
    method,
    hostname,
    path,
    headers,
  };

  return new Promise<TR>((resolve, reject) => {
    const chunks: any[] = [];
    const req = https
      // Maybe use retries here depending on status code and/or error?
      .request(options, (res) => {
        res.on('data', (chunk) => {
          chunks.push(chunk);
        });
        res.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString();
            if (!res.statusCode || res.statusCode < 200 || res.statusCode > 299) {
              const error = new Error(`statusCode=${res.statusCode}, contents=${body}`);
              reject(error);
            } else if (res.headers['content-type']?.includes('application/json')) {
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

export const get = <TR>(hostname: string, path: string, headers: OutgoingHttpHeaders): Promise<TR> =>
  makeRequest<void, TR>(hostname, 'GET', path, headers, undefined);

export const post = <TI, TR>(hostname: string, path: string, headers: OutgoingHttpHeaders, requestData?: TI) =>
  makeRequest<TI, TR>(hostname, 'POST', path, headers, requestData);
