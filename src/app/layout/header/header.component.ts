import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, shareReplay, timer } from 'rxjs';
import { DateTime } from 'luxon';
import { environmentBase } from 'src/environments/environment.base';
import { UserDto } from '@app/core/models/user/user';
import { UserService } from '@app/core/services/user.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  public profileName: string = '';

  public currentTime: string     = "";
  public currentDateTime: string = "";

  public showDate: boolean = true;

  public softwareVersion: string = "";

  constructor(
    private cdRef: ChangeDetectorRef,
    private userService: UserService
  ) { 
    
    this.softwareVersion = environmentBase.app.version;

    this.userService.loggedUser
    .pipe(filter(val => val == undefined))
    .subscribe(val => {
      this.profileName = val.firstName + ' ' + val.lastName;
      this.cdRef.markForCheck();
    }); 
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

  ngOnDestroy(){

  }
}
