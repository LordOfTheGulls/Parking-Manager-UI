import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParkSystemStatus, ParkLotStatus } from '@app/core/enums';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('triggerName', [
      transition('One => Two, Two => One', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100%',
          })
        ]),
        query(':enter', [style({ left: '-100%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('1s ease-out', style({ left: '100%', opacity: 0 }))]),
          query(':enter', [animate('1s ease-out', style({ left: '0%', opacity: 1 }))])
        ]),
        query(':enter', animateChild())
      ]),
    ]),

  ]
})
export class AppLayoutComponent implements OnInit {
  public parkSystemUptime: string = '0 d 0 h 0 m 0 s';

  public parkSystemStatus: ParkSystemStatus;
  public parkLotStatus:    ParkLotStatus;

  public ParkSystemStatus = ParkSystemStatus;
  public ParkLotStatus    = ParkLotStatus;
  
  constructor() { 
    this.parkSystemStatus = ParkSystemStatus.Unknown;
    this.parkLotStatus    = ParkLotStatus.Unknown;
  }

  ngOnInit(): void {
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }
}
 