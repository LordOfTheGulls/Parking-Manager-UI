import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
    
  }

  ngOnInit(): void {
   
  }
}
