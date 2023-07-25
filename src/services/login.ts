import { OutgoingHttpHeaders } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

import {
  InitCibaRequest,
  InitCibaBody,
  InitCibaResponse,
  AuthenticationMethod,
  InternalVippsConfiguration,
  StartLoginUriRequest,
  LoginOauthTokenResponse,
  TokenRequest,
  CibaTokenNoRedirectRequest,
  CibaTokenRedirectRequest,
} from '../@types';
import { post } from '../utils';

export class Login {
  private headers: OutgoingHttpHeaders;
  private vippsHostname: string;
  private configuration: InternalVippsConfiguration;

  constructor(configuration: InternalVippsConfiguration) {
    const vippsHostname = configuration.useTestMode ? 'https://apitest.vipps.no' : 'https://api.vipps.no';
    this.vippsHostname = process.env.VIPPS_HOSTNAME || vippsHostname;
    this.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset="utf-8"',
      'Merchant-Serial-Number': configuration.merchantSerialNumber,
      'Vipps-System-Name': configuration.vippsSystemName,
      'Vipps-System-Version': configuration.vippsSystemVersion,
      'Vipps-System-Plugin-Name': configuration.pluginName,
      'Vipps-System-Plugin-Version': configuration.pluginVersion,
    };
    this.configuration = configuration;
  }

  async InitCiba(
    initCibaRequest: InitCibaRequest,
    authenticationMethod: AuthenticationMethod,
  ): Promise<InitCibaResponse> {
    const initCibaBody: InitCibaBody = {
      scope: initCibaRequest.scope,
      login_hint: `urn:mobilenumber:${initCibaRequest.phoneNumber}`,
      state: uuidv4(),
      binding_message: initCibaRequest.binding_message?.toUpperCase(),
    };

    if (initCibaRequest.redirect_uri != null) {
      initCibaBody.redirect_uri = initCibaRequest.redirect_uri;
      initCibaBody.requested_flow = 'login_to_webpage';
    }

    const requestPath = '/vipps-login-ciba/api/backchannel/authentication';
    if (authenticationMethod === AuthenticationMethod.Post) {
      initCibaBody.client_id = this.configuration.clientId;
      initCibaBody.client_secret = this.configuration.clientSecret;

      return post<InitCibaBody, InitCibaResponse>(this.vippsHostname, requestPath, this.headers, initCibaBody);
    }
    return post<InitCibaBody, InitCibaResponse>(
      this.vippsHostname,
      requestPath,
      {
        ...this.headers,
        Authorization: `Basic ${Login.encodeCredentials(this.configuration.clientId, this.configuration.clientSecret)}`,
      },
      initCibaBody,
    );
  }

  GetStartLoginUri(startLoginUriRequest: StartLoginUriRequest, authenticationMethod: AuthenticationMethod) {
    let startLoginUri =
      `${this.vippsHostname}/access-management-1.0/access/oauth2/auth` +
      `?client_id=${this.configuration.clientId}` +
      '&response_type=code' +
      `&scope=${startLoginUriRequest.scope}` +
      `&state=${uuidv4()}` +
      `&redirect_uri=${startLoginUriRequest.redirect_uri}`;

    if (authenticationMethod === AuthenticationMethod.Post) {
      startLoginUri = `${startLoginUri}&response_mode=form_post`;
    }

    return startLoginUri;
  }

  async GetWebLoginToken(
    request: TokenRequest,
    authenticationMethod: AuthenticationMethod,
  ): Promise<LoginOauthTokenResponse> {
    const requestPath = '/access-management-1.0/access/oauth2/token';
    request.grant_type = 'authorization_code';

    if (authenticationMethod === AuthenticationMethod.Post) {
      request.client_id = this.configuration.clientId;
      request.client_secret = this.configuration.clientSecret;

      return post<TokenRequest, LoginOauthTokenResponse>(this.vippsHostname, requestPath, this.headers, request);
    }

    return post<TokenRequest, LoginOauthTokenResponse>(
      this.vippsHostname,
      requestPath,
      {
        ...this.headers,
        Authorization: `Basic ${Login.encodeCredentials(this.configuration.clientId, this.configuration.clientSecret)}`,
      },
      request,
    );
  }

  private static encodeCredentials(clientId: string, clientSecret: string): string {
    const credentials = `${clientId}:${clientSecret}`;
    const encodedString = Buffer.from(credentials, 'utf-8').toString('base64');
    return encodedString;
  }

  async GetCibaTokenNoRedirect(
    authReqId: string,
    authenticationMethod: AuthenticationMethod,
  ): Promise<LoginOauthTokenResponse> {
    const requestPath = '/access-management-1.0/access/oauth2/token';
    const cibaTokenRequest: CibaTokenNoRedirectRequest = {
      auth_req_id: authReqId,
      grant_type: 'urn:openid:params:grant-type:ciba',
    };

    if (authenticationMethod === AuthenticationMethod.Post) {
      cibaTokenRequest.client_id = this.configuration.clientId;
      cibaTokenRequest.client_secret = this.configuration.clientSecret;

      return post<CibaTokenNoRedirectRequest, LoginOauthTokenResponse>(
        this.vippsHostname,
        requestPath,
        this.headers,
        cibaTokenRequest,
      );
    }

    return post<CibaTokenNoRedirectRequest, LoginOauthTokenResponse>(
      this.vippsHostname,
      requestPath,
      {
        ...this.headers,
        Authorization: `Basic ${Login.encodeCredentials(this.configuration.clientId, this.configuration.clientSecret)}`,
      },
      cibaTokenRequest,
    );
  }

  async GetCibaTokenRedirect(
    code: string,
    authenticationMethod: AuthenticationMethod,
  ): Promise<LoginOauthTokenResponse> {
    const requestPath = '/access-management-1.0/access/oauth2/token';
    const cibaTokenRequest: CibaTokenRedirectRequest = {
      code,
      grant_type: 'urn:vipps:params:grant-type:ciba-redirect',
    };

    if (authenticationMethod === AuthenticationMethod.Post) {
      cibaTokenRequest.client_id = this.configuration.clientId;
      cibaTokenRequest.client_secret = this.configuration.clientSecret;

      return post<CibaTokenRedirectRequest, LoginOauthTokenResponse>(
        this.vippsHostname,
        requestPath,
        this.headers,
        cibaTokenRequest,
      );
    }

    return post<CibaTokenRedirectRequest, LoginOauthTokenResponse>(
      this.vippsHostname,
      requestPath,
      {
        ...this.headers,
        Authorization: `Basic ${Login.encodeCredentials(this.configuration.clientId, this.configuration.clientSecret)}`,
      },
      cibaTokenRequest,
    );
  }
}
