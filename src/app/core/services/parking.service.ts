import { Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, shareReplay } from "rxjs";


@Injectable({ providedIn: 'root' })
export class ParkingService {

    private parkingStatus$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(){

    }

    public get parkingStatus() {
        return this.parkingStatus$.pipe(shareReplay(), distinctUntilChanged());
    }

    public emitParkingStatus(data: any): void {
        this.parkingStatus$.next(data);
    }
}