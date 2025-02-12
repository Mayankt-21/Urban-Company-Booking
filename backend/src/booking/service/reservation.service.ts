/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Slot } from "../entities/slot";
import { Worker } from "../entities/worker"; // Import Worker entity
import { BookingGateway } from "../gateway/booking.gateway";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Reservation } from "../entities/reservation";
import { Repository } from "typeorm";
import { CreateReservationDto } from "../dto/create-reservation.dto";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,

    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,

    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>, // Inject Worker repository

    private readonly bookingGateway: BookingGateway,
  ) { }

  async getAllReservations() {
    const reservations = await this.reservationRepository.find({
      relations: ["slot", "worker"],
    });
    console.log(reservations); // Log the output to verify structure
    return reservations;
  }

  // Book Slot (updated to include workerId)
  async bookSlot(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { slotId, userName, workerId } = createReservationDto; // Destructure workerId

    const slot = await this.slotRepository.findOne({
      where: { id: slotId },
    });
    if (!slot) throw new NotFoundException('Slot not Found');
    if (slot.isBooked) throw new NotFoundException('Slot Already Booked');

    // Fetch the worker to reserve from the worker repository
    const worker = await this.workerRepository.findOne({
      where: { id: workerId },
    });
    if (!worker) throw new NotFoundException('Worker not found');

    // Create the reservation with the slot, userName, and worker
    const reservation = this.reservationRepository.create({ slot, userName, worker });
    await this.reservationRepository.save(reservation);

    slot.isBooked = true;
    await this.slotRepository.save(slot);

    this.bookingGateway.notifySlotBooked(slot.id, userName);

    return reservation;
  }

  // Cancel Slot
  async cancelReservation(id: number): Promise<{ message: string }> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['slot']
    });
    if (!reservation) throw new NotFoundException('Error Fetching Reservation Details')
    if (!reservation.slot) throw new NotFoundException('Slot for Reservation Not found');

    const slot = await this.slotRepository.findOne({ where: { id: reservation.slot.id } });
    if (!slot) throw new NotFoundException('Slot not found');

    slot.isBooked = false;
    await this.slotRepository.save(slot);
    await this.reservationRepository.delete(id);

    this.bookingGateway.notifySlotCanceled(slot.id);

    return { message: 'Reservation cancelled. Slot is now Available for booking' };
  }
}
