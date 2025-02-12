import { Slot } from "../entities/slot";
import { Worker } from "../entities/worker";
import { BookingGateway } from "../gateway/booking.gateway";
import { Reservation } from "../entities/reservation";
import { Repository } from "typeorm";
import { CreateReservationDto } from "../dto/create-reservation.dto";
export declare class ReservationService {
    private readonly slotRepository;
    private readonly reservationRepository;
    private readonly workerRepository;
    private readonly bookingGateway;
    constructor(slotRepository: Repository<Slot>, reservationRepository: Repository<Reservation>, workerRepository: Repository<Worker>, bookingGateway: BookingGateway);
    getAllReservations(): Promise<Reservation[]>;
    bookSlot(createReservationDto: CreateReservationDto): Promise<Reservation>;
    cancelReservation(id: number): Promise<{
        message: string;
    }>;
}
