import { Repository } from 'typeorm';
import { Slot } from '../entities/slot';
export declare class SlotService {
    private readonly slotRepository;
    constructor(slotRepository: Repository<Slot>);
    getAvailableSlots(): Promise<Slot[]>;
}
