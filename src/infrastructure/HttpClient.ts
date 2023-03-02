import { OutgoingHttpHeaders } from 'node:http';
import https from 'node:https';
import { HttpMethod, IHttpClient } from './IHttpClient';

export class HttpClient implements IHttpClient {
  hostname: string;
  port: number;

  constructor(hostname: string, port: number) {
    this.hostname = hostname;
    this.port = port;
  }

  makeRequest = (
    path: string,
    method: HttpMethod,
    headers: OutgoingHttpHeaders,
    requestData?: string,
  ): Promise<string> => {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path,
      method: HttpMethod[method],
      headers,
    } as https.RequestOptions;

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
                const error = { name: `statusCode=${resp.statusCode}`, message: `contents=${body}` } as Error;
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
}
