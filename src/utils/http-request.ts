import http, { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';
import retry from 'async-retry';
import packageJSON from '../../package.json';

function makeRequest<TR>(
  host: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  headers: OutgoingHttpHeaders,
  requestData?: any,
): Promise<TR> {
  const [, protocol, hostname, port] = host.match(/^(https?):\/{2}([^/:]*):?(\d{0,4})$/i) || [];

  const sdkVersion = packageJSON.version || 'unknown';
  const newHeaders = { ...headers };
  newHeaders['user-agent'] = `Vipps/Node SDK/${sdkVersion}`;

  const options: https.RequestOptions = {
    method,
    hostname,
    port,
    path,
    headers: newHeaders,
  };

  const client = protocol === 'https' ? https : http;

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
              throw new Error(body);
            } else if (res.headers['content-type']?.includes('application/json')) {
              resolve(JSON.parse(body));
            } else if (res.headers['content-type']?.includes('text/plain')) {
              resolve(body as TR);
            }
            resolve(null as TR);
          } catch (e) {
            if (e instanceof Error) {
              const result = { ok: false, message: JSON.parse(e.message) };
              resolve(result as TR);
            }
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
  retry(() => makeRequest<TR>(hostname, 'GET', path, headers), { retries: 3 });

export const post = <TI, TR>(hostname: string, path: string, headers: OutgoingHttpHeaders, requestData?: TI) =>
  retry(() => makeRequest<TR>(hostname, 'POST', path, headers, requestData), {
    retries: 3,
  });
