import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ParkSystemStatus, ParkLotStatus } from '@app/core/enums';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({ transform: 'none'})),
      state('flipped', style({ transform: 'rotateY(-180deg)'})),
      transition('default => flipped', [ animate('400ms')]),
      transition('flipped => default', [ animate('200ms')])
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent implements OnInit {
  @Input() public statName: string = '';
  @Input() public statIcon: string = '';
  @Input() public statInfo: string = '';
  @Input() public backgroundColor:  string = 'white';
  @Input() public statFor:  string = 'Today';

  public cardState: ('default' | 'flipped' | 'matched') = 'default';

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
  
  }

  @HostListener('mouseleave', ['$event']) onLeave( e: MouseEvent ) {
    if(this.cardState === 'flipped'){
      this.cardState = 'default';
      this.cdRef.markForCheck();
    }
  }

  ngOnInit(): void {
    
  }

  public flipCard($event: any): void {
    console.log($event);

    if (this.cardState === "default") {
      this.cardState = "flipped";
    } else {
      this.cardState = "default";
    }
    this.cdRef.markForCheck();
  }
}
