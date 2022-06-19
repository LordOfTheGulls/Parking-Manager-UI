import { Injectable } from '@angular/core';

import { User, UserManager, UserManagerSettings } from 'oidc-client';

import { getClientSettings } from '../auth/oidc-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private manager = new UserManager(getClientSettings());

  private user: User | null = null;

  constructor() { 
    this.manager.getUser()
    .then(user => {
      this.user = user;
    });
  }

  public isLoggedIn(): boolean{
    return this.user != null && !this.user.expired;
  }

  public getClaims(): any {
    return this.user?.profile;
  }

  public getToken(): string {
    return `${this.user?.token_type} ${this.user?.access_token}`;
  }

  public startAuthentication(): Promise<void>{
    return this.manager.signinRedirect();
  }

  public completeAuthentication(): Promise<void>{
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    })
  }
}
