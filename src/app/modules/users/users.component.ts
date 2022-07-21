import { MasterDetailModule, Module } from '@ag-grid-enterprise/all-modules';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterDto } from '@app/core/models/filter/filter';
import { Paging, PagingResult } from '@app/core/models/paging/paging';
import { UserDto, UserRightDto } from '@app/core/models/user/user';
import { UserService } from '@app/core/services/user.service';
import { GridOptions, GridReadyEvent, RowEditingStartedEvent, RowEditingStoppedEvent } from 'ag-grid-community';
import { ActionCellComponent } from 'src/app/shared/ag-grid/cells/action-cell-component';
import { ActionHeaderComponent } from 'src/app/shared/ag-grid/cells/action-header.component';
import { InputEditorComponent } from 'src/app/shared/ag-grid/editors/input-editor.component';
import { PermissionDetailComponent } from './components/permission-detail.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {

  public gridOptions: any;
  public usersData: UserDto[] = [];
  public modules: Module[] = [MasterDetailModule];

  public usersPaging: Paging = {
    page: 0,
    pageSize: 10
  };
  public totalUsers: number = 0;
  public loadingUsers: boolean = false;

  public userForm: FormGroup = {} as FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
    private userService: UserService,
  ) {
    
  }

  ngOnInit(): void {
    this.initForms();
    this.initGrids();
  }

  private initForms(): void {
    this.userForm = new FormGroup({
      userId: new FormControl(),
      username: new FormControl(),
      phone: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
    })
  }

  private initGrids(): void {
    this.gridOptions = {
      headerHeight: 40,
      rowHeight: 40,
      masterDetail: true,
      detailCellRendererFramework: PermissionDetailComponent,
      detailRowHeight: 100,
      suppressClickEdit: true,

      editType: 'fullRow',

      rowData: [],

      getRowNodeId: (params: any) => {
        return params.userId;
      },

      defaultColDef: {
        flex: 1,
        resizable: false,
      },

      columnDefs: [
        {
          headerName: 'UserId',
          field: 'userId',
          hide: true,
        },
        {
          headerName: 'Action',
          field: 'action',
          pinned: 'left',
          resizable: false,
          width: 120,
          headerComponentFramework: ActionHeaderComponent,
          headerComponentParams: {
            action:       this.addUser.bind(this),
          },
          cellRendererFramework: ActionCellComponent,
          cellRendererParams: {
            saveAction:   this.updateUser.bind(this),
            cancelAction: this.cancelUser.bind(this),
            editAction:   this.editUser.bind(this),
            deleteAction:   this.deleteUser.bind(this),
          }
        },
       
        {
          headerName: 'Username',
          field: 'username',
          showRowGroup: true,
          cellRenderer:'agGroupCellRenderer',
          editable: true,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            control: this.userForm.get('username')
          },
        },
        {
          headerName: 'First name',
          field: 'firstName',
          editable: true,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            control: this.userForm.get('firstName')
          },
        },
        {
          headerName: 'Last name',
          field: 'lastName',
          editable: true,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            control: this.userForm.get('lastName')
          },
        },
        {
          headerName: 'Email',
          field: 'email',
          editable: true,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            control: this.userForm.get('email')
          },
        },
        {
          headerName: 'Phonenumber',
          field: 'phone',
          editable: true,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            control: this.userForm.get('phone')
          },
        }
      ],
      
      onGridReady: (event: GridReadyEvent) => {
        this.gridOptions.api       = event.api;
        this.gridOptions.columnApi = event.columnApi;
        this.loadUsers(this.usersPaging);
      },

      onRowEditingStopped: (event: RowEditingStoppedEvent) => {
        event.api.refreshCells({
          columns: ['action'],
          rowNodes: [event.node],
          force: true
        });
      },

      onRowEditingStarted: (event: RowEditingStartedEvent) => {
        event.api.refreshCells({
          columns: ['action'],
          rowNodes: [event.node],
          force: true
        });
      }
    };
  }

  public usersPagingChange(event: any){
    this.usersPaging = { 
      page:     event.pageIndex,
      pageSize: event.pageSize,
    };
    this.loadUsers(this.usersPaging);
  }

  private loadUsers(paging: Paging): void {
    this.loadingUsers = true;
    const searchFilter: FilterDto = {
      paging: paging, sorting: []
    };
    this.userService.getUsers(searchFilter)
    .subscribe({
      next: (value: PagingResult<UserDto>) => {
        this.usersData  = value.records;
        this.totalUsers = value.totalRecords;
      },
      error: () => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      }
    });
  }

  private addUser(params: any): void {
    this.loadingUsers = true;
    this.userService.addUser()
    .subscribe({
      next: (val) => {
        this.loadUsers(this.usersPaging);
      },
      error: (val) => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      }
    })
  }

  private updateUser(params: any): void {
    this.loadingUsers = true;
    console.log(this.userForm.value)
    this.userService.updateUser(params.data.userId, this.userForm.value)
    .subscribe({
      next: (val) => {
        this.loadUsers(this.usersPaging);
        this.userService.getUser(1)
        .subscribe(val => {
          this.userService.loggedUser.next(val);
        });
      },
      error: (val) => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      }
    })
  }

  private deleteUser(params: any): void {
    this.loadingUsers = true;
    this.userService.deleteUser(params.data.userId)
    .subscribe({
      next: (val) => {
        this.loadUsers(this.usersPaging);
      },
      error: (val) => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingUsers = false;
        this.cdRef.markForCheck();
      }
    })
  }

  public cancelUser(params: any): void{
    this.userForm.reset({
    });
    params.api?.stopEditing(true);
  }

  public editUser(params: any): void {
    params.api?.startEditingCell({
      rowIndex: (params.rowIndex ?? 0),
      colKey:   params.column.getId()
    });
  }
}
