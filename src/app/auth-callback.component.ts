import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Auth Callback Page</p>`,
  styleUrls: []
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.completeAuthentication().finally(() => {
      console.log(this.authService.getToken());
    });
  }
}