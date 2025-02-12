"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_1 = require("./entities/reservation");
const worker_1 = require("./entities/worker");
const slot_1 = require("./entities/slot");
const worker_service_1 = require("./service/worker.service");
const slot_service_1 = require("./service/slot.service");
const reservation_service_1 = require("./service/reservation.service");
const booking_gateway_1 = require("./gateway/booking.gateway");
const worker_controller_1 = require("./controller/worker.controller");
const reservation_controller_1 = require("./controller/reservation.controller");
let BookingModule = class BookingModule {
};
exports.BookingModule = BookingModule;
exports.BookingModule = BookingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([worker_1.Worker, slot_1.Slot, reservation_1.Reservation])],
        controllers: [worker_controller_1.WorkerController, reservation_controller_1.ReservationController],
        providers: [worker_service_1.WorkerService, slot_service_1.SlotService, reservation_service_1.ReservationService, booking_gateway_1.BookingGateway],
        exports: [worker_service_1.WorkerService, slot_service_1.SlotService, reservation_service_1.ReservationService],
    })
], BookingModule);
//# sourceMappingURL=booking.module.js.map