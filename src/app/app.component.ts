import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pm-web';

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.iconRegistry.addSvgIcon(
      'pm-logo', this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/logo.svg")
    );
  }
}