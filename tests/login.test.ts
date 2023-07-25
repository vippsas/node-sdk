import { Login } from '../src/services';
import { AuthenticationMethod, InitCibaRequest, InternalVippsConfiguration, StartLoginUriRequest } from '../src/@types';
import { internalVippsConfiguration } from './utils/testConfiguration';

const customerPhoneNumber = '47753942';

describe('Login integration test', () => {
  test('Should get the correct Start Login URI', async () => {
    const login = new Login(internalVippsConfiguration);
    const request: StartLoginUriRequest = {
      scope: 'openid name',
      redirect_uri: 'http://localhost:3000',
    };

    const loginUri = login.GetStartLoginUri(request, AuthenticationMethod.Post);

    expect(loginUri).toContain('redirect_uri=http://localhost:3000');
    expect(loginUri).toContain('response_mode=form_post');
  });

  test('Should init a Ciba session', async () => {
    const login = new Login(internalVippsConfiguration);

    const request: InitCibaRequest = {
      scope: 'openid name',
      phoneNumber: customerPhoneNumber,
      binding_message: 'TESTING',
    };

    const response = await login.InitCiba(request, AuthenticationMethod.Basic);

    expect(response.auth_req_id).not.toBeNull();
    expect(response.expires_in).not.toBeNull();
    expect(response.interval).not.toBeNull();
  });
});
