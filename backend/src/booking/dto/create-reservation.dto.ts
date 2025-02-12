/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
    @IsNumber()
    @IsNotEmpty()
    slotId: number;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNumber()
    @IsNotEmpty()
    workerId: number;
}
