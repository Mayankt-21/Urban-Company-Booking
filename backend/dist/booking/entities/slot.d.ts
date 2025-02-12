import { Worker } from './worker';
import { Reservation } from './reservation';
export declare class Slot {
    id: number;
    time: string;
    isBooked: boolean;
    worker: Worker[];
    reservation: Reservation;
}
