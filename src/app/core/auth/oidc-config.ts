import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://localhost:7288/',
    client_id: 'pmspa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "code",
    scope: "pmapi",
    // userStore:  new WebStorageStateStore({ store: new CookieStorage() }),
    // stateStore: new WebStorageStateStore({ store: new CookieStorage() }),
    filterProtocolClaims: false,
    loadUserInfo: false,
  };
}