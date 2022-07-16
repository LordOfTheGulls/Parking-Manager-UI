import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ExportReportRequest } from 'proto/gen/export.pb';
import { Observable } from 'rxjs';
import { ExportService } from './core/services/export.service';
import { WebSocketService } from './core/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pm-web';

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private websocketService: WebSocketService,
    private exportService: ExportService
  ){
    this.iconRegistry.addSvgIcon(
      'pm-logo', this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/logo.svg")
    );
  }

  ngOnInit(){
    const stream = this.exportService.exportReport(new ExportReportRequest({ reportFromDate: '', reportToDate: '' }))

    stream.subscribe(val => {
      console.log('TEST', val)
    });
   
    this.websocketService.connect();
  }
}