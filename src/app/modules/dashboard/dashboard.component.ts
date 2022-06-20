import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParkSystemStatus, ParkLotStatus } from '@app/core/enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {


  public dashboard: any = {};

  constructor(
    private cdRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.dashboard.occupancy = {
      free:  2,
      total: 2,
      perc: 22,
    };
  }
}
