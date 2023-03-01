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

  makeRequest = (path: string, method: HttpMethod, headers: OutgoingHttpHeaders, requestData?: any): any => {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path: path,
      method: HttpMethod[method],
      headers: headers,
    } as https.RequestOptions;

    let returnValue: any = null;
    const req = https
      .request(options, (resp) => {
        console.log('statusCode:', resp.statusCode);
        // log the data
        resp.on('data', (d) => {
          process.stdout.write(d);
          returnValue = d;
        });
      })
      .on('error', (err) => {
        console.log('Error: ' + err.message);
        throw err; // TODO: maybe wrap in custom exception?
      });

    if (!!requestData) {
      req.write(JSON.stringify(requestData));
    }

    req.end();

    return returnValue;
  };
}
