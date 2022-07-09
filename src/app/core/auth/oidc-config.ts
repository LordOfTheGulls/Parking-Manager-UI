import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://localhost:5288/auth/login',
    client_id: 'pmspa',
    redirect_uri: window.location.origin,
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: "code",
    scope: "pmapi",
    userStore:  new WebStorageStateStore({ store: window.localStorage }),
    // stateStore: new WebStorageStateStore({ store: new CookieStorage() }),
    filterProtocolClaims: false,
    loadUserInfo: false,
  };
}