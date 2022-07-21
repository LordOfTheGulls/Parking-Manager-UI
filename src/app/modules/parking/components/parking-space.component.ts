import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-parking-space',
  template: `
    <div class="parking-space-wrapper" [ngClass]="{'is-taken' : isTaken }" [ngClass]="{'is-free' : !isTaken }">
        <span>Slot {{slotId}}</span>
        <mat-icon>local_parking</mat-icon>
    </div>
  `,
  styles: [`
    .parking-space-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 150px;
        height: 250px;
        background-color: #363636;
        font-weight: bold;
        box-shadow: 0px 6px 14px 0px !important;
        border-radius: 16px;

        span, mat-icon{
            color: white;
        }

        &.is-taken{
            background-color: #FF4500;
        }

        &.is-free{
            background-color: #32fc00;
        }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkingSpaceComponent implements OnInit {
    private parkingLotId: number = 1;

    @Input() public isTaken: boolean = false;
    @Input() public slotId:  number = 0;

    constructor(){

    }

    ngOnInit(): void {
        
    }

    ngOnDestroy() {
        
    }
}
