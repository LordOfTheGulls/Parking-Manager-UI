import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, shareReplay, timer } from 'rxjs';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {

  public profileName: string = 'A. Gospodinov';

  public currentTime: string     = "";
  public currentDateTime: string = "";

  public showDate: boolean = true;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { 

  }

  ngOnInit(): void {
    timer(0, 60000).pipe(
      map(tick => DateTime.now().setLocale('en-US')),
      shareReplay(1)
    ).subscribe((value: DateTime) => {
      this.currentDateTime = value.toFormat('HH:mm - LLL dd, yyyy');
      this.currentTime     = this.currentDateTime.split('-')[0];
      this.cdRef.markForCheck();
    });
  }

  public onShowDate(): void {
    this.showDate = !this.showDate;
    this.cdRef.markForCheck();
  }
}
