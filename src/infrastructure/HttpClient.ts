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
      path: path,
      method: HttpMethod[method],
      headers: headers,
    } as https.RequestOptions;

    return new Promise<string>(function (resolve, reject) {
      let chunks: any[] = [];
      const req = https
        // Maybe use retries here depending on status code and/or error?
        .request(options, (resp) => {
          if (!resp.statusCode || resp.statusCode < 200 || resp.statusCode > 299) {
            reject(new Error(`statusCode=${resp.statusCode}`));
          }
          resp.on('data', (chunk) => {
            chunks.push(chunk);
          });
          resp.on('end', () => {
            try {
              const body = Buffer.concat(chunks).toString();
              resolve(body);
            } catch (e) {
              reject(e);
            }
          });
        })
        .on('error', (err) => {
          reject(err);
        });

      if (!!requestData) {
        req.write(requestData);
      }

      req.end();
    });
  };
}
