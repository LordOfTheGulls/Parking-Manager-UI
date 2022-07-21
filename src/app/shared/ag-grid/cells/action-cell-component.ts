import {Component} from "@angular/core";
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";

@Component({
   template: `
    <div>
        <ng-container *ngIf="isRowInEditMode">

            <button mat-raised-button color="primary" id="save-row-btn" (click)="saveRow()" [disabled]="!canEdit">
                <mat-icon>save_icon</mat-icon>
            </button>
            
            <button mat-raised-button color="primary" id="cancel-row-btn" (click)="cancelRow()">
                <mat-icon>close</mat-icon>
            </button>

        </ng-container>

        <ng-container *ngIf="!isRowInEditMode">

            <button mat-raised-button color="primary" id="edit-row-btn" (click)="editRow()">
                <mat-icon>edit</mat-icon>
            </button>

            <button *ngIf="deleteActionAllowed" mat-raised-button color="warn" id="delete-row-btn" (click)="deleteRow()" [disabled]="!canEdit">
                <mat-icon>delete</mat-icon>
            </button>

        </ng-container>
      
    </div>
      
   `,
   styles: [`
        :host {
            div{
                display: flex;
                width: 100%;
                align-items: center;
            }
          
        }
        button{
            flex: 1;
            height: 100%;
            padding: 0 2px;

            &#cancel-row-btn{
                background-color: gray;
            }

            &#edit-row-btn, &#save-row-btn{
                background-color: #7CFC00;
                margin-right: 8px;
            }
        }
   `]
})
export class ActionCellComponent implements ICellRendererAngularComp {
    private params: any;

    public isRowInEditMode: boolean = false;

    public deleteActionAllowed: boolean = true;

    public canEdit: boolean = true;

    agInit(params: any): void {
        this.params = params;

        this.canEdit = params.canEdit ?? true;

        this.deleteActionAllowed = params.deleteActionAllowed ?? true;

        const editingCells = params.api.getEditingCells();

        this.isRowInEditMode = editingCells.some((cell: any) => {
            return cell.rowIndex === params.node.rowIndex
        });
    }

    refresh(params: ICellRendererParams): boolean {
       return false;
    }

    public saveRow(): void {
        this.params.saveAction(this.params);
    }

    public cancelRow(): void {
        this.params.cancelAction(this.params);
    }

    public editRow(): void {
        this.params.editAction(this.params);
    }

    public deleteRow(): void {
        this.params.deleteAction(this.params);
    }
}