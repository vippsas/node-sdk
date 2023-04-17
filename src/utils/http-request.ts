import http, { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';
import retry from 'async-retry';

function makeRequest<TR>(
  hostname: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: any,
): Promise<TR> {
  const options: https.RequestOptions = {
    method,
    hostname: hostname.replace(/https?:\/{2}/gi, ''),
    path,
    headers,
  };

  const client = hostname.startsWith('https') ? https : http;

  return new Promise<TR>((resolve, reject) => {
    const chunks: any[] = [];
    const req = client
      .request(options, (res) => {
        res.on('data', (chunk) => {
          chunks.push(chunk);
        });
        res.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString();
            if (!res.statusCode || res.statusCode < 200 || res.statusCode > 299) {
              const error = new Error(`path=${req.path} ,statusCode=${res.statusCode}, contents=${body}`);
              reject(error);
            } else if (res.headers['content-type']?.includes('application/json')) {
              resolve(JSON.parse(body));
            } else if (res.headers['content-type']?.includes('text/plain')) {
              resolve(body as TR);
            }
            resolve(null as TR);
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
}

export const get = <TR>(hostname: string, path: string, headers: OutgoingHttpHeaders): Promise<TR> =>
  retry(() => makeRequest<TR>(hostname, 'GET', path, headers), { retries: 4 });

export const post = <TI, TR>(hostname: string, path: string, headers: OutgoingHttpHeaders, requestData?: TI) =>
  retry(() => makeRequest<TR>(hostname, 'POST', path, headers, requestData), { retries: 4 });
