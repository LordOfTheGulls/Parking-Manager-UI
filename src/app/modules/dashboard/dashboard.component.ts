import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParkSystemStatus, ParkLotStatus } from '@app/core/enums';
import { EventDTO } from '@app/models/event';
import { DashboardService } from '@app/core/services/dashboard.service';
import { ParkingService } from '@app/core/services/parking.service';
import { ColDef, Grid, GridOptions, GridReadyEvent, Module, SortChangedEvent } from 'ag-grid-community';
import { PageEvent } from '@angular/material/paginator';
import { Paging, PagingResult } from '@app/core/models/paging/paging';
import { Sorting, SortOrder } from '@app/core/models/sorting/sorting';
import { FilterDto } from '@app/core/models/filter/filter';
import { Subject, takeUntil } from 'rxjs';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { NgxSpinnerService } from 'ngx-spinner';
 
@AutoUnsubscribe()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  public dashboard: any = {};

  public gridOptions: any;

  public eventData: EventDTO[] = []
  public eventsPaging: Paging = { page: 0, pageSize: 10};
  public eventsSorting: Sorting[] = [];
  public totalEvents: number = 100;
  
  private parkingLotId: number = 1;

  private eventSortingChanges: Subject<Sorting[]> = new Subject();

  constructor(
    private cdRef: ChangeDetectorRef,
    private parkingService: ParkingService,
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
    this.initGrids();
    this.valueChanges();

    this.dashboard.occupancy = {
      free:  2,
      total: 2,
      perc: 22,
    };

    this.parkingService.parkingStatus.subscribe(val => {
      console.log(val)
    })
  }

  private initGrids(): void {
    this.gridOptions = <GridOptions>{
      headerHeight: 40,
      rowHeight: 40,

      rowData: [],

      defaultColDef: {
        flex: 1,
        resizable: false,
      },

      columnDefs: [
        { 
          headerName: 'Event №',
          flex: 0.5,
          field: 'row',
          sortable: false,
          valueFormatter: (params) => ((params.node?.rowIndex ?? 0) + 1 + this.eventsPaging.page * this.eventsPaging.pageSize)
        },
        { 
          headerName: 'Event ID',
          field: 'eventId',
          flex: 0.5,
          sortable: false,
        },
        { 
          headerName: 'Event Date',
          field: 'eventDate',
          sort: 'desc',
          sortable: true,
          comparator: () => null,
        },
        { 
          headerName: 'Event Name',
          field: 'eventName',
          sortable: true,
          comparator: () => null,
        }
      ],

      onSortChanged: (event: SortChangedEvent) => {
        this.eventSortingChanges.next(
          event.api.getSortModel()
          .map(({ colId, sort }): Sorting => { 
            let sortOrder: SortOrder = SortOrder.None;
            if(sort == 'asc')       sortOrder = SortOrder.Asc;
            else if(sort == 'desc') sortOrder = SortOrder.Desc;
            return { columnId: colId ?? '', sortOrder };
          })
        );
      },

      onGridReady: (event: GridReadyEvent) => {
        this.gridOptions.api = event.api;
        this.gridOptions.columnApi = event.columnApi;
      }
    };
  }

  private valueChanges(): void {
    this.eventSortingChanges
    .subscribe((eventSorting: Sorting[]) => {
      this.eventsSorting = eventSorting;
      this.loadParkingEvents(this.parkingLotId, this.eventsPaging, eventSorting);
    });
  }
  
  public eventPagingChanges(event: PageEvent): void {
    this.eventsPaging = { 
      page:     event.pageIndex,
      pageSize: event.pageSize,
    };
    this.loadParkingEvents(this.parkingLotId, this.eventsPaging, this.eventsSorting);
  }

  private loadParkingEvents(lotId: number, paging: Paging, sorting?: Sorting[]): void {
    this.spinner.show();
    const filter: FilterDto = {
      paging:  paging,
      sorting: sorting
    }
    this.dashboardService.getParkingLotEvents(lotId, filter)
    .subscribe((value: PagingResult<EventDTO>) => {
      this.eventData   = value.records;
      this.totalEvents = value.totalRecords;
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
}
