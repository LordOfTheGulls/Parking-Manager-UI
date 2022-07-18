export interface WeeklyChartDto<T> {
    weeklyData: { [dayOfWeek: number]: T };
}

export interface ParkingTrafficInForWeekFilterDto {
    date: string;
}