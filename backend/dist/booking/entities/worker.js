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
exports.Worker = exports.professions = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const slot_1 = require("./slot");
const reservation_1 = require("./reservation");
var professions;
(function (professions) {
    professions["PLUMBER"] = "Plumber";
    professions["CARPENTER"] = "Carpenter";
    professions["ELECTRICIAN"] = "Electrician";
    professions["PAINTER"] = "Painter";
})(professions || (exports.professions = professions = {}));
let Worker = class Worker {
};
exports.Worker = Worker;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Worker.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "name", void 0);
__decorate([
    (0, typeorm_2.Column)({
        type: 'enum',
        enum: professions,
        default: professions.CARPENTER,
    }),
    __metadata("design:type", String)
], Worker.prototype, "specialization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_1.Reservation, (reservation) => reservation.worker),
    __metadata("design:type", Array)
], Worker.prototype, "reservations", void 0);
__decorate([
    (0, typeorm_2.ManyToMany)(() => slot_1.Slot, (slots) => slots.worker),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Worker.prototype, "slots", void 0);
exports.Worker = Worker = __decorate([
    (0, typeorm_1.Entity)()
], Worker);
//# sourceMappingURL=worker.js.map