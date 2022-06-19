import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkingComponent implements OnInit {

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
    
  }

  ngOnInit(): void {
   
  }
}
