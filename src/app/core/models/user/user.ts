export interface UserRightDto{
    canEditBlacklist: boolean;
    canEditWorkhours: boolean;
    canEditParkingRate: boolean;
}

export interface UserDto {
    userId: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    username: string;
    userRights?: UserRightDto;
}