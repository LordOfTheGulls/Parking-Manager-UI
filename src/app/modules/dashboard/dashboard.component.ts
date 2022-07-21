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
import { concat, concatAll, forkJoin, from, Subject, takeUntil } from 'rxjs';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { NgxSpinnerService } from 'ngx-spinner';
import { TrafficDTO } from '@app/core/models/traffic';
import * as moment from 'moment';
import { Chart, registerables } from 'chart.js';
import { WeeklyChartDto, ParkingTrafficInForWeekFilterDto } from './core/models/chart';
import { PaymentService } from '@app/core/services/payment.service';
 
@AutoUnsubscribe()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  private parkingLotId: number = 1;

  public dashboard: any = {};

  public totalFreeSlots: number= 4;
  public totalSlots: number = 16;

  public totalIn: number = 0;
  public loadingTotalIn: boolean = false;

  public totalProfit: number = 0;
  public loadingTotalProfit: boolean = false;

  public stayTime: number = 0;
  public loadingStayTime: boolean = false;

  public eventGridOptions: any;
  public trafficGridOptions: any;

  public eventData:     EventDTO[] = []
  public eventsPaging:  Paging = { page: 0, pageSize: 10};
  public eventsSorting: Sorting[] | null = null;
  public totalEvents:   number = 0;
  
  public trafficData:   TrafficDTO[] = [];
  public trafficPaging: Paging = { page: 0, pageSize: 10 };
  public trafficSorting: Sorting[] | null = null;
  public totalTraffic:  number = 0 ;

  public loadingEventsData:  boolean = false;
  public loadingTrafficData: boolean = false;

  public peakTrafficBarChartData: any;
  public peakTrafficBarChartLabels: any;
  public peakTrafficBarChartOptions: any;
  public peakTrafficBarChartLegened: any;
  public loadingPeakTrafficChartData: boolean = false;

  public profitMadeBarChartData: any;
  public profitMadeBarChartLabels: any;
  public profitMadeBarChartOptions: any;
  public profitMadeBarChartLegend: any;
  public loadingProfitMadeChartData: boolean = false;

  public parkingActivityLineChartData: any;
  public parkingActivityLineChartLabels: any;
  public parkingActivityLineChartOptions: any;
  public parkingActivityLineChartLegend: any;
  public loadingActivityChartData: boolean = false;

  private eventSortingChanges: Subject<Sorting[]> = new Subject();

  private today = moment().format('YYYY-MM-DD');

  constructor(
    private cdRef: ChangeDetectorRef,
    private parkingService: ParkingService,
    private dashboardService: DashboardService,
    private paymentService: PaymentService,
    private spinner: NgxSpinnerService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initCards();
    this.initGrids();
    this.initCharts();

    this.valueChanges();

    this.dashboard.occupancy = {
      free:  2,
      total: 2,
      perc: 22,
    };
  }

  private initCards(): void {
    this.loadingTotalIn = true;
    this.dashboardService.getParkingTrafficInForPeriod(this.parkingLotId, this.today, this.today)
    .subscribe({
      next: (totalIn: number) => {
        this.totalIn = totalIn;
      },
      error: () => {
        this.loadingTotalIn = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingTotalIn = false;
        this.cdRef.markForCheck();
      }
    });

    this.loadingTotalProfit = true;
    this.dashboardService.getTotalProfitForPeriod(this.parkingLotId, this.today, this.today)
    .subscribe({
      next: (totalProfit: number) => {
        this.totalProfit = totalProfit;
      },
      error: () => {
        this.loadingTotalProfit = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingTotalProfit = false;
        this.cdRef.markForCheck();
      }
    });

    this.loadingStayTime= true;
    this.dashboardService.getAverageStayTimeForPeriod(this.parkingLotId, this.today, this.today)
    .subscribe({
      next: (stayTime: number) => {
        this.stayTime = stayTime;
      },
      error: () => {
        this.loadingStayTime = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingStayTime = false;
        this.cdRef.markForCheck();
      }
    });
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
          headerName: 'Event Log Id',
          field: 'eventLogId',
          flex: 0.5,
          sortable: false,
        },
        { 
          headerName: 'Event Date',
          field: 'eventDate',
          sort: 'desc',
          sortable: true,
          valueFormatter: ({value}) => {
            if(value)
              return moment(value).format('DD/MM/YYYY HH:mm');
            return '';
          },
          comparator: () => null,
        },
        { 
          headerName: 'Event Name',
          field: 'eventName',
          sortable: true,
          //comparator: () => null,
        },
        { 
          headerName: 'Event ID',
          field: 'eventId',
          hide: true
        },
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
        this.loadParkingEvents(this.parkingLotId, this.eventsPaging, this.eventsSorting);
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
          valueFormatter: (params) => ((params.node?.rowIndex ?? 0) + 1 + this.trafficPaging.page * this.trafficPaging.pageSize)
        },
        { 
          headerName: 'Traffic Log Id',
          field: 'trafficLogId',
          flex: 0.5,
          sortable: false,
        },
        { 
          headerName: 'License Plate',
          field: 'licensePlate',
          sortable: true,
          comparator: () => null,
        },
        { 
          headerName: 'In Date',
          field: 'inDate',
          sort: 'desc',
          sortable: true,
          valueFormatter: ({value}) => {
            if(value) return moment(value).format('DD/MM/YYYY HH:mm');
            return '';
          },
          comparator: () => null,
        },
      ],

      onSortChanged: (event: SortChangedEvent) => {
        
      },

      onGridReady: (event: GridReadyEvent) => {
        this.trafficGridOptions.api = event.api;
        this.trafficGridOptions.columnApi = event.columnApi;
        this.loadTrafficData(this.parkingLotId, this.trafficPaging, this.trafficSorting);
      }
    };
  }

  private initCharts(): void {
    const weeklyLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    //Parking Traffic Chart.
    this.peakTrafficBarChartLabels = weeklyLabels; //[
      // '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
      // '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
      // '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
      // '21:00', '22:00', '23:00',
    //];
    this.peakTrafficBarChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      barBackgroundColor: '#5B9EF1',
      barHoverBackgroundColor: 'yellowgreen',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    this.peakTrafficBarChartData = [
      { 
        data:   Array(7).fill(0),
        label: 'Lot Traffic In (This week)'
      }
    ];

    this.loadingPeakTrafficChartData = true;

    this.dashboardService.getParkingTrafficInForWeekData(this.parkingLotId, { date: this.today })
    .subscribe({
      next: (data: WeeklyChartDto<number>) => {
        const weeklyData = data.weeklyData;
        const trafficChartData = Array(7).fill(0).map((_, indx: any) => {
          if(weeklyData?.[indx] != undefined) return weeklyData[indx];
          return 0;
        });
        this.peakTrafficBarChartData = [
          {
            data: trafficChartData,
            label: this.peakTrafficBarChartData[0].label
          }
        ];
      },
      error: () => {
        this.loadingPeakTrafficChartData = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingPeakTrafficChartData = false;
        this.cdRef.markForCheck();
      }
    });
    
    //Profit Made Chart.
    this.profitMadeBarChartLabels = weeklyLabels;

    this.profitMadeBarChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      barBackgroundColor: 'lawngreen',
      barHoverBackgroundColor: 'yellowgreen',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    this.profitMadeBarChartData = [
      { 
        data: Array(7).fill(0), 
        label: 'Total Profit Made in lv. (This week)'
      },
    ];

    this.loadingProfitMadeChartData = true;
    this.dashboardService.getTotalProfitForWeek(this.parkingLotId, this.today)
    .subscribe({
      next: (data: WeeklyChartDto<number>) => {
        const weeklyData = data.weeklyData;
        const proftChartData = Array(7).fill(0).map((_, indx: any) => {
          if(weeklyData?.[indx] != undefined) return weeklyData[indx];
          return 0;
        });
        this.profitMadeBarChartData = [
          {
            data: proftChartData,
            label: this.profitMadeBarChartData[0].label
          }
        ];
      },
      error: () => {
        this.loadingProfitMadeChartData = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingProfitMadeChartData = false;
        this.cdRef.markForCheck();
      }
    });

    //Activity Chart.
    this.parkingActivityLineChartLabels = weeklyLabels;
    this.parkingActivityLineChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      barBackgroundColor: 'lawngreen',
      barHoverBackgroundColor: 'yellow',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    this.parkingActivityLineChartData = [
      { 
        data: Array(7).fill(0), 
        label: 'Traffic Activity'
      },
      { 
        data: Array(7).fill(0), 
        label: 'System Activity'
      },
      { 
        data: Array(7).fill(0), 
        label: 'User Activity'
      },
    ];

    this.loadingActivityChartData = true;

    forkJoin([
      this.dashboardService.getParkingTrafficInForWeekData(this.parkingLotId, { date: this.today }),
      this.dashboardService.getParkingEventsForWeekData(this.parkingLotId, this.today),
      //this.dashboardService.getUserActivityForWeekData(this.parkingLotId, this.today),
    ]).subscribe({
      next: ([trafficActivity, eventsActivity]) => {
        this.parkingActivityLineChartData = [
          {
            data: Array(7).fill(0).map((_, indx: any) => {
              if(trafficActivity.weeklyData?.[indx] != undefined) return trafficActivity.weeklyData[indx];
              return 0;
            }),
            label: this.parkingActivityLineChartData[0].label
          },
          {
            data: Array(7).fill(0).map((_, indx: any) => {
              if(eventsActivity.weeklyData?.[indx] != undefined) return eventsActivity.weeklyData[indx];
              return 0;
            }),
            label: this.parkingActivityLineChartData[1].label
          },
          {
            data: [],
            label: this.parkingActivityLineChartData[2].label
          }
        ]
      },
      error: () => {
        this.loadingActivityChartData = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingActivityChartData = false;
        this.cdRef.markForCheck();
      }
    });
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

  private loadParkingEvents(lotId: number, paging: Paging, sorting?: Sorting[] | null): void {
    this.loadingEventsData = true;
    const filter: FilterDto = {
      paging:  paging,
      sorting: sorting
    };
    this.dashboardService.getParkingLotEvents(lotId, filter)
    .subscribe({
      next: (value: PagingResult<EventDTO>) => {
        this.eventData   = value.records;
        this.totalEvents = value.totalRecords;
      },
      error: () => {
        this.loadingEventsData = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingEventsData = false;
        this.cdRef.markForCheck();
      }
    });
  }

  private loadTrafficData(lotId: number, paging: Paging, sorting?: Sorting[] | null): void {
    this.loadingTrafficData = true;
    const filter: FilterDto = {
      paging:  paging,
      sorting: sorting
    };
    this.dashboardService.getParkingTrafficData(lotId, filter)
    .subscribe({
      next: (value: PagingResult<TrafficDTO>) => {
        this.trafficData  = value.records;
        this.totalTraffic = value.totalRecords;
      },
      error: () => {
        this.loadingTrafficData = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingTrafficData = false;
        this.cdRef.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    
  }
}
