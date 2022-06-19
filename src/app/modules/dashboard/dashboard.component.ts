import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParkSystemStatus, ParkLotStatus } from '@app/core/enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public parkSystemUptime: string = '0 d 0 h 0 m 0 s';

  public parkSystemStatus: ParkSystemStatus;
  public parkLotStatus:    ParkLotStatus;

  public ParkSystemStatus = ParkSystemStatus;
  public ParkLotStatus    = ParkLotStatus;

  public dashboard: any = {};

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
    this.parkSystemStatus = ParkSystemStatus.Unknown;
    this.parkLotStatus    = ParkLotStatus.Unknown;
    this.cdRef.markForCheck();
  }

  ngOnInit(): void {
    this.dashboard.occupancy = {
      free:  2,
      total: 2,
      perc: 22,
    };
  }
}
