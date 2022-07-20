export interface ParkingPricingDto {
    parkingPricingIntervalId: number;
    dayOfWeek?: number;
    intervalStart: number;
    intervalEnd: number;
    rate: number;
    incremental: number;
    incrementalRate: number;
}

export interface ParkingPricingIntervalsDto {
    [dayOfWeek: number]: ParkingPricingDto[];
}