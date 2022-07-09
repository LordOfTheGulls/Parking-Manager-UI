import { ParkingSlotType } from "@app/core/enums/parking/slot-type";

interface ParkingSlotStatus {
    spotId:     number
    spotTaken:  boolean;
    spotActive: boolean;
    spotType:   ParkingSlotType
}

interface BarriersStatuses {
    isEntranceOpen: boolean;
    isExitOpen: boolean;
}

export interface ParkingStatusDto {
    isParkingOpen?: boolean;
    slotsStatuses?: { [slotId: number]: ParkingSlotStatus };
    barriersStatuses?: BarriersStatuses;
}