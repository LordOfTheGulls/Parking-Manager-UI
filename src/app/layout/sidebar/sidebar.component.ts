import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class AppSideBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public help(): void {
    
  }

  public dashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  public parkingManagement(): void {
    this.router.navigateByUrl('/parking');
  }

  public reportManagement(): void {
    this.router.navigateByUrl('/reports');
  }

  public userManagement(): void {
    this.router.navigateByUrl('/users');
  }

  public settings(): void {
    this.router.navigateByUrl('/settings');
  }
}
