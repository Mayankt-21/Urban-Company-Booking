import { CreateReservationDto } from '../dto/create-reservation.dto';
import { BookingGateway } from '../gateway/booking.gateway';
import { ReservationService } from './../service/reservation.service';
export declare class ReservationController {
    private readonly reservationService;
    private readonly bookingGateway;
    constructor(reservationService: ReservationService, bookingGateway: BookingGateway);
    getAllReservations(): Promise<import("../entities/reservation").Reservation[]>;
    bookSlot(createReservationDto: CreateReservationDto): Promise<import("../entities/reservation").Reservation>;
    cancelReservation(id: number): Promise<{
        message: string;
    }>;
}
