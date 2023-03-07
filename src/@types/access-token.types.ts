/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthorizationTokenResponse {
  /**
   * The type for the access token.
   * This will always be `Bearer`.
   * @example "Bearer"
   */
  token_type: string;
  /**
   * Token expiry time in seconds.
   * The access token is valid for 1 hour in the test environment
   * and 24 hours in the production environment.
   * @example 3600
   */
  expires_in: number;
  /**
   * Extra time added to expiry time. Currently disabled.
   * @example 3600
   */
  ext_expires_in: number;
  /**
   * Token expiry time in epoch time format.
   * @example 1547823408
   */
  expires_on: number;
  /**
   * Token creation time in epoch time format.
   * @example 1547819508
   */
  not_before: number;
  /**
   * A common resource object.
   * Not used in token validation.
   * This can be disregarded.
   * @example "00000002-0000-0000-c000-000000000000"
   */
  resource: string;
  /**
   * The access token itself.
   * It is a base64-encoded string, typically 1000+ characters.
   * It can be decoded on https://jwt.io, and using standard libraries.
   * See the documentation for details.
   * @format byte
   * @example "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1Ni <truncated>"
   */
  access_token: string;
}
