import { RowNode } from '@ag-grid-enterprise/all-modules';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { PageEvent } from '@angular/material/paginator';
import { FilterDto } from '@app/core/models/filter/filter';
import { Paging, PagingResult } from '@app/core/models/paging/paging';
import { ParkingBlackListDto } from '@app/core/models/parking/parking-blacklist';
import { ParkingLocationDto } from '@app/core/models/parking/parking-location';
import { ParkingLotPaymentDto } from '@app/core/models/parking/parking-payment';
import { ParkingPricingDto, ParkingPricingIntervalsDto } from '@app/core/models/parking/parking-pricing';
import { ParkingRateIntervalDto } from '@app/core/models/parking/parking-rate-interval';
import { ParkingWorkhourDto } from '@app/core/models/parking/parking-workhours';
import { Sorting } from '@app/core/models/sorting/sorting';
import { TrafficDTO } from '@app/core/models/traffic';
import { UserDto } from '@app/core/models/user/user';
import { ParkingService } from '@app/core/services/parking.service';
import { PaymentService } from '@app/core/services/payment.service';
import { UserService } from '@app/core/services/user.service';
import { GridOptions, GridReadyEvent, RowEditingStartedEvent, RowEditingStoppedEvent, SortChangedEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { catchError, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { ActionCellComponent } from 'src/app/shared/ag-grid/cells/action-cell-component';
import { ActionHeaderComponent } from 'src/app/shared/ag-grid/cells/action-header.component';
import { HeaderTextIconComponent } from 'src/app/shared/ag-grid/cells/header-icon.component';
import { InputEditorComponent } from 'src/app/shared/ag-grid/editors/input-editor.component';
import { TimePickerEditorComponent } from 'src/app/shared/ag-grid/editors/time-picker-cell.component';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { ParkingPaymentDto } from '../payment/core/models/payment';
import { RateLengthEditorComponent } from './components/rate-length-cell.component';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkingComponent implements OnInit {
  private parkingLotId: number = 1;

  @ViewChild(GoogleMap, { static: false }) googleMap: GoogleMap = {} as GoogleMap;

  public  mapOptions: google.maps.MapOptions   = {};
  public  parkingMarker: google.maps.Marker    = {} as google.maps.Marker;
  public parkingLocationChanged: boolean = false;

  public parkingLocation: ParkingLocationDto = {} as ParkingLocationDto;

  public  rateGridOptions: GridOptions = {} as GridOptions;
  public  rateData:        ParkingPricingDto[] = [];
  private rateIntervals:   ParkingPricingIntervalsDto = {} as ParkingPricingIntervalsDto;
  public  rateForm:         FormGroup = {} as FormGroup;
  public  rateIntervalForm: FormGroup = {} as FormGroup;
  public loadingParkingPricing: boolean = false;

  public workHoursGridOptions: GridOptions = {} as GridOptions;
  public workHoursData: ParkingWorkhourDto[] = [];
  public workHourForm: FormGroup = {} as FormGroup;
  public loadingParkingWorkhours: boolean = false;

  public blackListGridOptions: GridOptions = {} as GridOptions;
  public blackListData: ParkingBlackListDto[] = [];
  public blackListForm: FormGroup = {} as FormGroup;
  public loadingBlackList: boolean = false;

  public trafficGridOptions: any;
  public trafficData:   TrafficDTO[] = [];
  public trafficPaging: Paging = { page: 0, pageSize: 10 };
  public trafficSorting: Sorting[] | null = null;
  public totalTraffic:  number = 0 ;
  public loadingTrafficData: boolean = false;

  public paymentGridOptions: any;
  public paymentData:   ParkingLotPaymentDto[] = [];
  public paymentPaging: Paging = { page: 0, pageSize: 10 };
  public paymentSorting: Sorting[] | null = null;
  public totalPayments:  number = 0 ;
  public loadingPaymentData: boolean = false;

  public parkingSpaces: {}[] = [ 
    { spotId: 1, isTaken: true },
    { spotId: 2, isTaken: true },
    { spotId: 3, isTaken: true },
    { spotId: 4, isTaken: false },
    { spotId: 5, isTaken: true },
    { spotId: 6, isTaken: true },
    { spotId: 7, isTaken: true },
    { spotId: 8, isTaken: true },
    { spotId: 9, isTaken: true },
    { spotId: 10, isTaken: true },
    { spotId: 11, isTaken: true },
    { spotId: 12, isTaken: true },
    { spotId: 13, isTaken: true },
    { spotId: 14, isTaken: false },
    { spotId: 15, isTaken: true },
    { spotId: 16, isTaken: true },
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    private parkingService: ParkingService,
    private dashboardService: DashboardService,
    private userService: UserService,
    private paymentService: PaymentService
  ) {
    this.parkingLocation = { parkingLotId: 1, lattitude: 43.2087666, longitude: 27.9031027 };

    this.userService.getUser(1)
    .subscribe(val => {
      this.userService.loggedUser.next(val);
    });
  }

  ngOnInit(): void {
    this.initForms();
    this.valueChanges();
    this.initGrids();
  }

  private valueChanges(): void {

    this.parkingService.parkingLotInfo(this.parkingLotId)
    .subscribe(val => {
        console.log(val)
       const mapsLocation = { 
        lat: val.parkingLocation.lattitude, 
        lng: val.parkingLocation.longitude
      };

      this.mapOptions = {
        mapTypeId: 'hybrid',
        center: mapsLocation,
        zoom: 18,
        disableDoubleClickZoom: true,
        maxZoom: 18,
        minZoom: 4,
      };
      this.parkingMarker = new google.maps.Marker({
        icon: {
          url: 'https://cdn-icons.flaticon.com/png/512/3005/premium/3005366.png?token=exp=1658259007~hmac=c2782e33d7bc084fc2858c9ca6817f1c',
          scaledSize:   new google.maps.Size(54, 52),
          labelOrigin: new google.maps.Point(34, -24)
        },
        label:{ 
          text: val.parkingName, 
          className: 'parkinglabel',
        },
        position: mapsLocation,
        draggable: true,
        crossOnDrag: true
      });
    });

    const { intervalStartHours, intervalEndHours, intervalEndMinutes, intervalRate, incremental, incrementalRate } = this.rateIntervalForm.controls;
    this.rateForm.get('dayOfWeek')?.valueChanges
    .subscribe((dayOfWeek: number) => {
      if(this.rateIntervals){
        this.rateData = this.rateIntervals[dayOfWeek];
        this.cdRef.markForCheck();
      }
    });

    incrementalRate.valueChanges
    .subscribe((incrementRate: number) => {
      const lengthStart = (+intervalStartHours.value ?? 0) * 60 + (+intervalStartHours.value ?? 0);
      const lengthEnd   = (+intervalEndHours.value ?? 0)   * 60 + (+intervalEndMinutes.value ?? 0);
      const lengthDiff  = (+lengthEnd - +lengthStart);
      const increment   = (+incremental.value ?? 0);
      if(increment > 0){
        const step: number = lengthDiff / increment;
        if(step > 0){
          intervalRate.setValue((step * (+incrementRate ?? 0)).toFixed(2), { emitEvent: false });
        }
      }
    });

    combineLatest([
      intervalRate?.valueChanges,
      intervalEndHours?.valueChanges,
      incremental?.valueChanges,
    ]).subscribe(() => {
      const lengthStart = (+intervalStartHours.value ?? 0) * 60 + (+intervalStartHours.value ?? 0);
      const lengthEnd   = (+intervalEndHours.value ?? 0)   * 60 + (+intervalEndMinutes.value ?? 0);
      const rate        = (+intervalRate.value ?? 0)
      const lengthDiff  = (lengthEnd - lengthStart);
      const increment   = (Math.min(+incremental.value ?? 0, lengthDiff));
      incremental.setValue(increment, { emitEvent: false });
      const step: number = lengthDiff / increment;
      if(step > 0 && rate > 0){
        incrementalRate.setValue(+(rate / step).toFixed(2), { emitEvent: false });
      }else{
        incrementalRate.setValue(0, { emitEvent: false });
      }
    });
  }

  private initForms(): void {
    this.rateForm = new FormGroup({
      pricingModel: new FormControl(0),
      dayOfWeek:    new FormControl(0),
    });
    this.rateIntervalForm = new FormGroup({
      intervalStartHours:   new FormControl(0),
      intervalStartMinutes: new FormControl(0),
      intervalEndHours:     new FormControl(0),
      intervalEndMinutes:   new FormControl(0),
      intervalRate:         new FormControl(0), 
      incremental:          new FormControl(0),
      incrementalRate:      new FormControl(0)
    });
    this.blackListForm = new FormGroup({
      licensePlate: new FormControl('')
    });
    this.workHourForm = new FormGroup({
      openTime:  new FormControl(0),
      closeTime: new FormControl(0)
    });
  }

  private initGrids(): void {
    this.rateGridOptions = {
      headerHeight: 40,
      rowHeight: 40,
      suppressClickEdit: true,

      editType: 'fullRow',

      rowData: [
        
      ],

      getRowNodeId: (params) => {
        return params.parkingPricingIntervalId
      },
      
      defaultColDef: {
        sortable: false,
        editable: false,
        suppressMovable: true,
      },

      columnDefs: [
        {
          headerName: '',
          field: 'parkingPricingIntervalId',
          hide: true,
        },
        {
          headerName: '',
          field: 'action',
          pinned: 'left',
          resizable: false,
          width: 120,
          headerComponentFramework: ActionHeaderComponent,
          headerComponentParams: {
            action: this.addInterval.bind(this),
          },
          cellRendererFramework: ActionCellComponent,
          cellRendererParams: {
            saveAction:   this.updateInterval.bind(this),
            cancelAction: this.cancelInterval.bind(this),
            editAction:   this.editInterval.bind(this),
            deleteAction: this.deleteInterval.bind(this),
            canEdit: this.userService.loggedUser.getValue().userRights?.canEditParkingRate,
          }
        },
        { 
          headerName: '№',
          field: 'inverval',
          flex: 0.5,
          resizable: false,
          valueFormatter: (params) => (+(params.node?.rowIndex ?? 0) + 1) + ' - '
        },
        {
          headerName: 'Interval Start',
          field: 'intervalStart',
          editable: true,
          flex: 1,
          cellEditorFramework: RateLengthEditorComponent,
          cellEditorParams: {
            hoursControl:   this.rateIntervalForm.get('intervalStartHours'),
            minutesControl: this.rateIntervalForm.get('intervalStartMinutes'),
          },
          valueFormatter: (params) => {
            const result = (params.value.toFixed(2) + '').split('.');
            console.log(params.value);

            if(result.length == 2){
              return `${result[0]} Hour ${result[1]} Min`;
            }
            return '0 Hour 0 Min';
          }
        },
        {
          headerName: 'Interval End',
          field: 'intervalEnd',
          editable: true,
          flex: 1,
          cellEditorFramework: RateLengthEditorComponent,
          cellEditorParams: {
            hoursControl:   this.rateIntervalForm.get('intervalEndHours'),
            minutesControl: this.rateIntervalForm.get('intervalEndMinutes'),
          },
          valueFormatter: (params) => {
            const result = (params.value.toFixed(2) + '').split('.');
            if(result.length == 2){
              return `${result[0]} Hour ${result[1]} Min`;
            }
            return '0 Hour 0 Min';
          }
        },
        {
          headerName: 'Rate',
          field: 'rate',
          editable: true,
          flex: 1,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            label: 'LV.',
            width: '40px',
            control: this.rateIntervalForm.get('intervalRate')
          },
          valueFormatter: (params) => {
            return params.value.toFixed(2) + ' LV.';
          }
        },
        {
          headerName: 'Incremental',
          field: 'incremental',
          editable: true,
          flex: 1,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            label: 'M',
            width: '40px',
            control: this.rateIntervalForm.get('incremental')
          },
          valueFormatter: (params) => {
            return params.value + ' MIN.';
          }
        },
        {
          headerName: 'Incremental Rate',
          field: 'incrementalRate',
          editable: true,
          flex: 1,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            label: 'LV.',
            width: '40px',
            control: this.rateIntervalForm.get('incrementalRate')
          },
          valueFormatter: (params) => {
            return params.value.toFixed(2) + ' LV.';
          }
        },
      ],

      onGridReady: (event) => {
        this.rateGridOptions.api = event.api;
        this.rateGridOptions.columnApi = event.columnApi;
        this.loadParkingPricingIntervals(this.parkingLotId);
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
    }

    this.workHoursGridOptions = {
      headerHeight: 40,
      rowHeight: 40,
      suppressClickEdit: true,

      editType: 'fullRow',

      rowData: [
        
      ],

      getRowNodeId: (params) => {
        return params.workhourId;
      },
      
      defaultColDef: {
        sortable: false,
        editable: false,
        suppressMovable: true,
      },

      columnDefs: [
        {
          headerName: 'Id',
          field: 'workhourId',
          hide: true
        },
        {
          headerName: 'Action',
          field: 'action',
          pinned: 'left',
          resizable: false,
          width: 120,
          cellRendererFramework: ActionCellComponent,
          cellRendererParams: {
            saveAction:   this.updateWorkhour.bind(this),
            cancelAction: this.cancelWorkhour.bind(this),
            editAction:   this.editWorkhour.bind(this),
            deleteActionAllowed: false,
            canEdit: this.userService.loggedUser.getValue().userRights?.canEditWorkhours,
          }
        },
        {
          headerName: 'Day Of Week',
          field: 'weekDay',
          flex: 1,
          valueFormatter: (params) => {
            switch(params.value){
              case 0: return 'Monday';
              case 1: return 'Tuesday';
              case 2: return 'Wednesday';
              case 3: return 'Thursday';
              case 4: return 'Friday';
              case 5: return 'Saturday';
              case 6: return 'Sunday';
              default: return '';
            }
          }
        },
        {
          headerName: 'Open Time',
          field: 'openTime',
          editable: true,
          flex: 1,
          cellEditorFramework: TimePickerEditorComponent,
          cellEditorParams: {
            control: this.workHourForm.get('openTime')
          },
          headerComponentFramework: HeaderTextIconComponent,
          headerComponentParams: {
            matIcon: 'access_time',
          }
        },
        {
          headerName: 'Close Time',
          field: 'closeTime',
          editable: true,
          flex: 1,
          cellEditorFramework: TimePickerEditorComponent,
          cellEditorParams: {
            control: this.workHourForm.get('closeTime')
          },
          headerComponentFramework: HeaderTextIconComponent,
          headerComponentParams: {
            matIcon: 'access_time',
          }
        },
      ],

      onGridReady: (event) => {
        this.workHoursGridOptions.api = event.api;
        this.workHoursGridOptions.columnApi = event.columnApi;
        this.loadParkingWorkhours(this.parkingLotId, 1);
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
    }

    this.blackListGridOptions = {
      headerHeight: 40,
      rowHeight: 40,
      suppressClickEdit: true,

      editType: 'fullRow',

      rowData: [
        
      ],

      getRowNodeId: (params) => {
        return params.blacklistId;
      },
      
      defaultColDef: {
        sortable: false,
        editable: false,
        suppressMovable: true,
        flex: 1
      },

      columnDefs: [
        {
          headerName: 'Id',
          field: 'blacklistId',
          hide: true
        },
        {
          headerName: 'Action',
          field: 'action',
          pinned: 'left',
          resizable: false,
          width: 120,
          headerComponentFramework: ActionHeaderComponent,
          headerComponentParams: {
            action:       this.addToBlacklist.bind(this),
          },
          cellRendererFramework: ActionCellComponent,
          cellRendererParams: {
            saveAction:   this.updateBlacklist.bind(this),
            cancelAction: this.cancelBlacklist.bind(this),
            editAction:   this.editBlacklist.bind(this),
            deleteAction:   this.deleteBlacklist.bind(this),
            canEdit: this.userService.loggedUser.getValue().userRights?.canEditBlacklist,
          }
        },
        { 
          headerName: '№',
          field: 'blacklist',
          flex: 0.5,
          resizable: false,
          valueFormatter: (params: any) => (+(params.node?.rowIndex ?? 0) + 1) + ' - '
        },
        {
          headerName: 'Blocked Plate',
          field: 'licensePlate',
          editable: true,
          cellEditorFramework: InputEditorComponent,
          cellEditorParams: {
            control: this.blackListForm.get('licensePlate')
          },
        },
      ],

      onGridReady: (event) => {
        this.blackListGridOptions.api = event.api;
        this.blackListGridOptions.columnApi = event.columnApi;
        this.loadParkingBlacklist(this.parkingLotId);
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
    }

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
        { 
          headerName: 'Out Date',
          field: 'outDate',
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

    this.paymentGridOptions = <GridOptions>{
      headerHeight: 40,
      rowHeight: 40,

      rowData: [],

      defaultColDef: {
        flex: 1,
        resizable: false,
      },

      columnDefs: [
        { 
          headerName: 'Payment Id',
          field: 'paymentId',
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
          headerName: 'Amount',
          field: 'amount',
          sortable: true,
          comparator: () => null,
        },
        { 
          headerName: 'Method Name',
          field: 'paymentMethod',
          sortable: true,
          comparator: () => null,
        },
        { 
          headerName: 'Date',
          field: 'date',
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
        this.loadPaymentData(this.parkingLotId, this.paymentPaging, this.paymentSorting);
      }
    };
  }

  public goToParkingLocation(): void {
    this.googleMap.googleMap?.setCenter(new google.maps.LatLng({ lat: this.parkingLocation.lattitude, lng: this.parkingLocation.longitude }))
  }

  public updateParkingLocation(): void {
    const { longitude, lattitude } = this.parkingLocation;

    this.parkingService.updateParkingLocation(this.parkingLotId, {
      longitude: longitude,
      lattitude: lattitude
    } as ParkingLocationDto)
    .subscribe(val => {

    })
    //const position: any = this.parkingMarker.getPosition();
    //console.log(position.lat())
    //console.log(position.lng())
  }

  public parkingLocationChanges({ latLng }: any): void {
    this.parkingLocation = {
      ...this.parkingLocation,
      lattitude: latLng.lat(),
      longitude: latLng.lng(),
    };
    this.parkingLocationChanged = true;
    this.cdRef.markForCheck();
  }

  public updatePricingModel(): void {

  }

  public addInterval(node: RowNode): void {
    this.loadingParkingPricing = true;
    this.cdRef.markForCheck();
    const { dayOfWeek } = this.rateForm.value;
    this.parkingService.addParkingPricingInterval(this.parkingLotId, 1, dayOfWeek)
    .subscribe({
      next: (val) => {
        this.loadParkingPricingIntervals(this.parkingLotId);
      },
      error: () => {
        this.loadingParkingPricing = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingParkingPricing = false;
        this.cdRef.markForCheck();
      }
    });
  }

  public updateInterval(params: any): void {
    const {  
      intervalStartHours,
      intervalStartMinutes,
      intervalEndHours,
      intervalEndMinutes,
      intervalRate, 
      incremental,
      incrementalRate
    } = this.rateIntervalForm.value;
    
    const parkingPricing: ParkingPricingDto = {
      parkingPricingIntervalId: params.data.parkingPricingIntervalId,
      intervalStart:   +`${intervalStartHours}.${intervalStartMinutes}`,
      intervalEnd:     +`${intervalEndHours}.${intervalEndMinutes}`,
      rate:            intervalRate,
      incremental:     incremental,
      incrementalRate: incrementalRate
    };

    this.parkingService.updateParkingPricingInterval(params.data.parkingPricingIntervalId, parkingPricing)
    .subscribe({
      next: (val) => {
        this.loadParkingPricingIntervals(this.parkingLotId);
      },
      error: () => {
        this.loadingParkingPricing = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingParkingPricing = false;
        this.cdRef.markForCheck();
        params.api?.stopEditing(true);
      }
    });
  }

  public deleteInterval(params: any): void {
    this.loadingParkingPricing = true;
    this.cdRef.markForCheck();
    this.parkingService.deleteParkingPricingInterval(params.data.parkingPricingIntervalId)
      .subscribe({
        next: (val) => {
          this.loadParkingPricingIntervals(this.parkingLotId);
        },
        error: () => {
          this.loadingParkingPricing = false;
          this.cdRef.markForCheck();
        },
        complete: () => {
          this.loadingParkingPricing = false;
          this.cdRef.markForCheck();
        }
    });
  }

  public editInterval(params: any): void {
    params.api?.startEditingCell({
      rowIndex: (params.rowIndex ?? 0),
      colKey:   params.column.getId()
    });
  }

  public cancelInterval(params: any): void {
    this.rateIntervalForm.reset({
      intervalStartHours:   0,
      intervalStartMinutes: 0,
      intervalEndHours:     0,
      intervalEndMinutes:   0,
      intervalRate:         0, 
      incremental:          0,
      incrementalRate:      0
    });
    params.api?.stopEditing(true);
  }
  
  public addToBlacklist(params: any): void {
    this.loadingBlackList = true;
    this.cdRef.markForCheck();
    this.parkingService.addToBlacklist(this.parkingLotId)
    .subscribe({
      next: (val) => {
        this.loadParkingBlacklist(this.parkingLotId);
      },
      error: () => {
        this.loadingBlackList = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingBlackList = false;
        this.cdRef.markForCheck();
      }
    });
  }

  public updateBlacklist(params: any): void {
    const { licensePlate } = this.blackListForm.value;
    const parkingBlacklist: ParkingBlackListDto = {
      blacklistId: params.data.blacklistId,
      licensePlate: licensePlate
    };
    this.loadingBlackList = true;
    this.parkingService.updateParkingBlacklist(this.parkingLotId, parkingBlacklist)
    .subscribe({
      next: (val) => {
        this.loadParkingBlacklist(this.parkingLotId);
      },
      error: () => {
        this.loadingBlackList = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingBlackList = false;
        this.cdRef.markForCheck();
        params.api?.stopEditing(true);
      }
    });
  }

  public cancelBlacklist(params: any): void{
    this.blackListForm.reset({
      licensePlate:  '',
    });
    params.api?.stopEditing(true);
  }

  public editBlacklist(params: any): void {
    params.api?.startEditingCell({
      rowIndex: (params.rowIndex ?? 0),
      colKey:   params.column.getId()
    });
  }

  public deleteBlacklist(params: any): void {
    this.loadingBlackList = true;
    this.cdRef.markForCheck();
    this.parkingService.deleteParkingBlacklist(this.parkingLotId, params.data.blacklistId)
      .subscribe({
        next: (val) => {
          this.loadParkingBlacklist(this.parkingLotId);
        },
        error: () => {
          this.loadingBlackList = false;
          this.cdRef.markForCheck();
        },
        complete: () => {
          this.loadingBlackList = false;
          this.cdRef.markForCheck();
          params.api?.stopEditing(true);
        }
    });
  }

  public updateWorkhour(params: any): void {
    const { openTime, closeTime } = this.workHourForm.value;
    const parkingWorkhour: ParkingWorkhourDto = {
      workhourId: params.data.workhourId,
      openTime:  openTime,
      closeTime: closeTime
    };
    this.loadingParkingWorkhours = false;
    this.cdRef.markForCheck();
    this.parkingService.updateParkingWorkhours(this.parkingLotId, parkingWorkhour)
    .subscribe({
      next: (val) => {
        this.loadParkingWorkhours(this.parkingLotId, 1);
      },
      error: () => {
        this.loadingParkingWorkhours = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingParkingWorkhours = false;
        this.cdRef.markForCheck();
        params.api?.stopEditing(true);
      }
    });
  }

  public cancelWorkhour(params: any): void{
    this.workHourForm.reset({
      openTime:  0,
      closeTime: 0,
    });
    params.api?.stopEditing(true);
  }

  public editWorkhour(params: any): void {
    params.api?.startEditingCell({
      rowIndex: (params.rowIndex ?? 0),
      colKey:   params.column.getId()
    });
  }

  private loadParkingPricingIntervals(lotId: number): void {
    this.loadingParkingPricing = true;
    this.cdRef.markForCheck();
    this.parkingService.getParkingPricingIntervals(lotId, 1)
    .subscribe({
      next: (value: ParkingPricingIntervalsDto) => {
        const { dayOfWeek } = this.rateForm.value;
        this.rateIntervals = value;
        if(value){
          this.rateData = value[dayOfWeek];
          this.cdRef.markForCheck();
        }
      },
      error: () => {
        this.loadingParkingPricing = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingParkingPricing = false;
        this.cdRef.markForCheck();
      }
    });
  }

  private loadParkingBlacklist(lotId: number): void {
    this.loadingBlackList = true;
    this.cdRef.markForCheck();
    this.parkingService.getParkingBlacklist(lotId)
    .subscribe({
      next: (value: ParkingBlackListDto[]) => {
        this.blackListData = value;
        this.cdRef.markForCheck();
      },
      error: () => {
        this.loadingBlackList = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingBlackList = false;
        this.cdRef.markForCheck();
      }
    });
  }

  private loadParkingWorkhours(lotId: number, workhoursPlanId: number = 1): void {
    this.loadingParkingWorkhours = true;
    this.cdRef.markForCheck();
    this.parkingService.getParkingWorkhours(lotId, workhoursPlanId)
    .subscribe({
      next: (value: ParkingWorkhourDto[]) => {
        this.workHoursData = value;
        this.cdRef.markForCheck();
      },
      error: () => {
        this.loadingParkingWorkhours = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingParkingWorkhours = false;
        this.cdRef.markForCheck();
      }
    });
  }

  public trafficPagingChanges(event: PageEvent): void {
    this.trafficPaging = { 
      page:     event.pageIndex,
      pageSize: event.pageSize,
    };
    this.loadTrafficData(this.parkingLotId, this.trafficPaging, this.trafficSorting);
  }

  public paymentPagingChanges(event: PageEvent): void {
    this.trafficPaging = { 
      page:     event.pageIndex,
      pageSize: event.pageSize,
    };
    this.loadPaymentData(this.parkingLotId, this.paymentPaging, this.paymentSorting);
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

  private loadPaymentData(lotId: number, paging: Paging, sorting?: Sorting[] | null): void {
    this.loadingPaymentData = true;
    const filter: FilterDto = {
      paging:  paging,
      sorting: sorting
    };
    this.paymentService.getAllPayments(lotId, filter)
    .subscribe({
      next: (value: PagingResult<ParkingLotPaymentDto>) => {
        this.paymentData   = value.records;
        this.totalPayments = value.totalRecords;
      },
      error: () => {
        this.loadingPaymentData = false;
        this.cdRef.markForCheck();
      },
      complete: () => {
        this.loadingPaymentData = false;
        this.cdRef.markForCheck();
      }
    });
  }
}
