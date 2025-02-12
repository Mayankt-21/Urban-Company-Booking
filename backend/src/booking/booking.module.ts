import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation';
import { Worker } from './entities/worker';
import { Slot } from './entities/slot';
import { WorkerService } from './service/worker.service';
import { SlotService } from './service/slot.service';
import { ReservationService } from './service/reservation.service';
import { BookingGateway } from './gateway/booking.gateway';
import { WorkerController } from './controller/worker.controller';
import { ReservationController } from './controller/reservation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Worker, Slot, Reservation])],
  controllers: [WorkerController, ReservationController],
  providers: [WorkerService, SlotService, ReservationService, BookingGateway],
  exports: [WorkerService, SlotService, ReservationService],
})
export class BookingModule { }
