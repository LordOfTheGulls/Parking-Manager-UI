import { OnInit, Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";
import { EventDTO } from "@app/core/models/event";
import { UserService } from "@app/core/services/user.service";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { GridOptions, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import * as moment from "moment";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { ExportReportByDateRequest } from "proto/gen/export.pb";
import { ExportClient } from "proto/gen/export.pbsc";


@AutoUnsubscribe()
@Component({
    template: `
        <div class="permission-wrapper">
            <app-spinner [showSpinner]="loadingPermissions"></app-spinner>
            <section class="permission-section" [formGroup]="permissionGroup">
                <mat-checkbox formControlName="canEditBlacklist">Can Edit Blacklist</mat-checkbox>
                <mat-checkbox formControlName="canEditWorkhours">Can Edit Workhours</mat-checkbox>
                <mat-checkbox formControlName="canEditParkingRate">Can Edit Parking Rate</mat-checkbox>
            </section>
            <button mat-raised-button color="accent" id="update-btn" type="button" (click)="updatePermissions()">
                Update Permissions <mat-icon matSuffix class="export-icon">save_icon</mat-icon>
            </button>
        </div>
    `,
    styles: [`
        .permission-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            mat-checkbox{
                margin-right: 16px;
            }
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionDetailComponent implements ICellRendererAngularComp, OnDestroy{

    private userId: number = 1;

    private params: any;

    public loadingPermissions: boolean = false;

    public permissionGroup: FormGroup = {} as FormGroup;

    constructor(
        private cdRef: ChangeDetectorRef,
        private userService: UserService
    ){
        this.permissionGroup = new FormGroup({
            canEditBlacklist: new FormControl(false),
            canEditWorkhours: new FormControl(false),
            canEditParkingRate: new FormControl(false),
        });
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }

    agInit(params: ICellRendererParams): void {
        this.userId = params.data.userId;
        this.loadPermissions()
    }


    ngOnDestroy() {
        
    }

    private loadPermissions(): void {
        this.loadingPermissions = true;
        this.cdRef.markForCheck();
        this.userService.getPermissions(this.userId)
        .subscribe({
          next: (val) => {
            this.permissionGroup.setValue(val);
          },
          error: (val) => {
            this.loadingPermissions = false;
            this.cdRef.markForCheck();
          },
          complete: () => {
            this.loadingPermissions = false;
            this.cdRef.markForCheck();
          }
        })
      }

    public updatePermissions(): void {
        this.loadingPermissions = true;
        this.userService.updatePermissions(this.userId, this.permissionGroup.value)
        .subscribe({
          next: (val) => {
            this.userService.getPermissions(this.userId);
          },
          error: (val) => {
            this.loadingPermissions = false;
            this.cdRef.markForCheck();
          },
          complete: () => {
            this.loadingPermissions = false;
            this.cdRef.markForCheck();
          }
        })
      }
}