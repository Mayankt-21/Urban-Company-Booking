import { Worker } from '../entities/worker';
import { Repository } from 'typeorm';
export declare class WorkerService {
    private readonly workerRepository;
    constructor(workerRepository: Repository<Worker>);
    getAllWorkers(): Promise<Worker[]>;
    getWorkerById(id: number): Promise<Worker>;
}
