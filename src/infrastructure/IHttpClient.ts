import { OutgoingHttpHeaders } from 'node:http';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface IHttpClient {
  makeRequest: (path: string, method: HttpMethod, headers: OutgoingHttpHeaders, requestData?: any) => any;
}
