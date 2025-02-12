"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const slot_1 = require("../entities/slot");
const worker_1 = require("../entities/worker");
const booking_gateway_1 = require("../gateway/booking.gateway");
const common_1 = require("@nestjs/common");
const reservation_1 = require("../entities/reservation");
const typeorm_2 = require("typeorm");
let ReservationService = class ReservationService {
    constructor(slotRepository, reservationRepository, workerRepository, bookingGateway) {
        this.slotRepository = slotRepository;
        this.reservationRepository = reservationRepository;
        this.workerRepository = workerRepository;
        this.bookingGateway = bookingGateway;
    }
    async getAllReservations() {
        const reservations = await this.reservationRepository.find({
            relations: ["slot", "worker"],
        });
        console.log(reservations);
        return reservations;
    }
    async bookSlot(createReservationDto) {
        const { slotId, userName, workerId } = createReservationDto;
        const slot = await this.slotRepository.findOne({
            where: { id: slotId },
        });
        if (!slot)
            throw new common_1.NotFoundException('Slot not Found');
        if (slot.isBooked)
            throw new common_1.NotFoundException('Slot Already Booked');
        const worker = await this.workerRepository.findOne({
            where: { id: workerId },
        });
        if (!worker)
            throw new common_1.NotFoundException('Worker not found');
        const reservation = this.reservationRepository.create({ slot, userName, worker });
        await this.reservationRepository.save(reservation);
        slot.isBooked = true;
        await this.slotRepository.save(slot);
        this.bookingGateway.notifySlotBooked(slot.id, userName);
        return reservation;
    }
    async cancelReservation(id) {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['slot']
        });
        if (!reservation)
            throw new common_1.NotFoundException('Error Fetching Reservation Details');
        if (!reservation.slot)
            throw new common_1.NotFoundException('Slot for Reservation Not found');
        const slot = await this.slotRepository.findOne({ where: { id: reservation.slot.id } });
        if (!slot)
            throw new common_1.NotFoundException('Slot not found');
        slot.isBooked = false;
        await this.slotRepository.save(slot);
        await this.reservationRepository.delete(id);
        this.bookingGateway.notifySlotCanceled(slot.id);
        return { message: 'Reservation cancelled. Slot is now Available for booking' };
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(slot_1.Slot)),
    __param(1, (0, typeorm_1.InjectRepository)(reservation_1.Reservation)),
    __param(2, (0, typeorm_1.InjectRepository)(worker_1.Worker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        booking_gateway_1.BookingGateway])
], ReservationService);
//# sourceMappingURL=reservation.service.js.map