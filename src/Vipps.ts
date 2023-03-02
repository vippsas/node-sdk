import { IHttpClient } from './infrastructure/IHttpClient';
import { VippsConfigurationOptions } from './infrastructure/VippsConfigurationOptions';
import { CheckoutService } from './Services/CheckoutService';
import { HttpClient } from './infrastructure/HttpClient';

export class Vipps {
  configoptions: VippsConfigurationOptions;
  httpClient: IHttpClient;
  checkoutService: CheckoutService;
  systemName: string;
  systemVersion: string;

  constructor(options: VippsConfigurationOptions, httpClient?: IHttpClient) {
    this.configoptions = options;
    this.systemName = 'Vipps node SDK';
    this.systemVersion = '0.9.0';
    // TODO: apitest.vipps.no for testmode
    const hostName = options.useTestMode ? 'ece46ec4-6f9c-489b-8fe5-146a89e11635.tech-02.net' : 'api.vipps.no';
    this.httpClient = httpClient || new HttpClient(hostName, 443);
    this.checkoutService = new CheckoutService(this);
  }
}
