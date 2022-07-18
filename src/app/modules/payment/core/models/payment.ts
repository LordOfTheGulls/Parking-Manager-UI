export interface CreditCardInfoDto {
    creditCardHolderName: string;
    creditCardNumber: string;
    cvc: number;
}

export interface ParkingPaymentDto {
    licensePlate: string;
    creditCardInfo: CreditCardInfoDto;
}