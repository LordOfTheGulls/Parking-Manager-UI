import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ParkSystemStatus, ParkLotStatus } from '@app/core/enums';
import { EventDTO } from '@app/models/event';
import { DashboardService } from 'src/app/modules/dashboard/services/dashboard.service';
import { ParkingService } from '@app/core/services/parking.service';
import { ColDef, Grid, GridOptions, GridReadyEvent, Module, SortChangedEvent } from 'ag-grid-community';
import { PageEvent } from '@angular/material/paginator';
import { Paging, PagingResult } from '@app/core/models/paging/paging';
import { Sorting, SortOrder } from '@app/core/models/sorting/sorting';
import { FilterDto } from '@app/core/models/filter/filter';
import { Subject, takeUntil } from 'rxjs';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { NgxSpinnerService } from 'ngx-spinner';
import { TrafficDTO } from '@app/core/models/traffic';
 
@AutoUnsubscribe()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  public dashboard: any = {};

  public eventGridOptions: any;
  public trafficGridOptions: any;

  public eventData:     EventDTO[] = []
  public eventsPaging:  Paging = { page: 0, pageSize: 10};
  public eventsSorting: Sorting[] = [];
  public totalEvents:   number = 0;
  
  public trafficData:   TrafficDTO[] = [];
  public trafficPaging: Paging = { page: 0, pageSize: 10 };
  public trafficSorting: Sorting[] = [];
  public totalTraffic:  number = 0 ;

  public loadingTrafficData: boolean = false;

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
    this.eventGridOptions = <GridOptions>{
      headerHeight: 40,
      rowHeight:    40,

      rowData: [],

      defaultColDef: {
        flex: 1,
        resizable: false,
      },

      columnDefs: [
        { 
          headerName: '',
          flex: 0.2,
          field: 'flag',
          sortable: false,
        },
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
        this.eventGridOptions.api = event.api;
        this.eventGridOptions.columnApi = event.columnApi;
      }
    };

    this.trafficGridOptions = <GridOptions>{
      headerHeight: 40,
      rowHeight: 40,

      rowData: [],

      defaultColDef: {
        flex: 1,
        resizable: false,
      },

      columnDefs: [
        { 
          headerName: 'Traffic №',
          flex: 0.5,
          field: 'row',
          sortable: false,
          valueFormatter: (params) => ((params.node?.rowIndex ?? 0) + 1 + this.eventsPaging.page * this.eventsPaging.pageSize)
        },
        { 
          headerName: 'ID',
          field: 'eventId',
          flex: 0.5,
          sortable: false,
        },
        { 
          headerName: 'Date',
          field: 'eventDate',
          sort: 'desc',
          sortable: true,
          comparator: () => null,
        },
        { 
          headerName: 'IN',
          field: 'eventName',
          sortable: true,
          comparator: () => null,
        }
      ],

      onSortChanged: (event: SortChangedEvent) => {
        
      },

      onGridReady: (event: GridReadyEvent) => {
        this.trafficGridOptions.api = event.api;
        this.trafficGridOptions.columnApi = event.columnApi;
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

  public trafficPagingChanges(event: PageEvent): void {
    this.trafficPaging = { 
      page:     event.pageIndex,
      pageSize: event.pageSize,
    };
    this.loadTrafficData(this.parkingLotId, this.trafficPaging, this.trafficSorting);
  }

  private loadParkingEvents(lotId: number, paging: Paging, sorting?: Sorting[]): void {
    this.spinner.show();
    const filter: FilterDto = {
      paging:  paging,
      sorting: sorting
    };
    this.dashboardService.getParkingLotEvents(lotId, filter)
    .subscribe((value: PagingResult<EventDTO>) => {
      this.eventData   = value.records;
      this.totalEvents = value.totalRecords;
      this.spinner.hide();
      this.cdRef.markForCheck();
    });
  }

  private loadTrafficData(lotId: number, paging: Paging, sorting?: Sorting[]): void {
    const filter: FilterDto = {
      paging:  paging,
      sorting: sorting
    };
    this.dashboardService.getParkingTrafficData(lotId, filter)
    .subscribe((value: PagingResult<TrafficDTO>) => {
      this.trafficData  = value.records;
      this.totalTraffic = value.totalRecords;
      this.cdRef.markForCheck();
    });
  }


  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
}
