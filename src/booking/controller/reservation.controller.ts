/* eslint-disable prettier/prettier */
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { BookingGateway } from '../gateway/booking.gateway';
import { ReservationService } from './../service/reservation.service';
import { Body, Controller, Delete, Post, Param, Get } from '@nestjs/common';

@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly bookingGateway: BookingGateway,
    ) { }

    @Get()
    async getAllReservations() {
        return this.reservationService.getAllReservations();
    }

    @Post()
    async bookSlot(@Body() createReservationDto: CreateReservationDto) {
        const reservation =
            await this.reservationService.bookSlot(createReservationDto);

        this.bookingGateway.notifySlotBooked(
            reservation.slot.id,
            reservation.userName,
        );

        return reservation;
    }
    @Delete(':id')
    async cancelReservation(@Param('id') id: number) {
        const response = await this.reservationService.cancelReservation(id);

        this.bookingGateway.notifySlotCanceled(id);

        return response;
    }

}
