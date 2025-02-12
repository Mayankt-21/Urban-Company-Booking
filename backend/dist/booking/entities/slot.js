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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const typeorm_1 = require("typeorm");
const worker_1 = require("./worker");
const reservation_1 = require("./reservation");
let Slot = class Slot {
};
exports.Slot = Slot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Slot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: false,
    }),
    __metadata("design:type", String)
], Slot.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Slot.prototype, "isBooked", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => worker_1.Worker, (worker) => worker.slots),
    __metadata("design:type", Array)
], Slot.prototype, "worker", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reservation_1.Reservation, (reservation) => reservation.slot),
    __metadata("design:type", reservation_1.Reservation)
], Slot.prototype, "reservation", void 0);
exports.Slot = Slot = __decorate([
    (0, typeorm_1.Entity)()
], Slot);
//# sourceMappingURL=slot.js.map