import { Slot } from './slot';
import { Reservation } from './reservation';
export declare enum professions {
    PLUMBER = "Plumber",
    CARPENTER = "Carpenter",
    ELECTRICIAN = "Electrician",
    PAINTER = "Painter"
}
export declare class Worker {
    id: number;
    name: string;
    specialization: professions;
    reservations: Reservation[];
    slots: Slot[];
}
