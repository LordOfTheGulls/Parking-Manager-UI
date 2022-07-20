import { RowNode } from '@ag-grid-enterprise/all-modules';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { ParkingLocationDto } from '@app/core/models/parking/parking-location';
import { ParkingPricingDto, ParkingPricingIntervalsDto } from '@app/core/models/parking/parking-pricing';
import { ParkingRateIntervalDto } from '@app/core/models/parking/parking-rate-interval';
import { ParkingService } from '@app/core/services/parking.service';
import { GridOptions, RowEditingStartedEvent, RowEditingStoppedEvent } from 'ag-grid-community';
import { catchError, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { ActionCellComponent } from 'src/app/shared/ag-grid/cells/action-cell-component';
import { ActionHeaderComponent } from 'src/app/shared/ag-grid/cells/action-header.component';
import { InputEditorComponent } from 'src/app/shared/ag-grid/editors/input-editor.component';
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


  public rateGridOptions: GridOptions = {} as GridOptions;
  public rateData: ParkingPricingDto[] = [];
  private rateIntervals: ParkingPricingIntervalsDto = {} as ParkingPricingIntervalsDto;

  public rateForm: FormGroup = {} as FormGroup;
  public rateIntervalForm: FormGroup = {} as FormGroup;

  public loadingParkingPricing: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private parkingService: ParkingService,
  ) {
    this.parkingLocation = { parkingLotId: 1, latitude: 43.2087666, longitude: 27.9031027 };

    const mapsLocation = { 
      lat: this.parkingLocation.latitude, 
      lng: this.parkingLocation.longitude
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
        text:"Parking 'Kolhozen Pazar' 1", 
        className: 'parkinglabel',
      },
      position: mapsLocation,
      draggable: true,
      crossOnDrag: true
    });

    this.rateData = [
      
    ]
  }

  ngOnInit(): void {
    this.initForms();
    this.valueChanges();
    this.initGrids();
  }

  private valueChanges(): void {
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
  }

  public goToParkingLocation(): void {
    this.googleMap.googleMap?.setCenter(new google.maps.LatLng({ lat: this.parkingLocation.latitude, lng: this.parkingLocation.longitude }))
  }

  public loadParkingPricing(lotId: number, day: number): void {
    this.loadingParkingPricing = true;
    

    this.cdRef.markForCheck();
  }

  public updateParkingLocation(): void {
    //const position: any = this.parkingMarker.getPosition();
    //console.log(position.lat())
    //console.log(position.lng())
  }

  public parkingLocationChanges({ latLng }: any): void {
    this.parkingLocation = {
      ...this.parkingLocation,
      latitude:  latLng.lat(),
      longitude: latLng.lng(),
    };
    this.parkingLocationChanged = true;
    this.cdRef.markForCheck();
  }

  public updatePricingModel(): void {

  }

  public addInterval(node: RowNode): void {
    this.loadingParkingPricing = true;
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
          params.api?.stopEditing(true);
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

  private loadParkingPricingIntervals(lotId: number): void {
    this.loadingParkingPricing = true;
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
}
