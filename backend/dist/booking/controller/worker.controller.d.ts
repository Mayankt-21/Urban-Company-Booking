import { WorkerService } from './../service/worker.service';
export declare class WorkerController {
    private readonly workerService;
    constructor(workerService: WorkerService);
    getAllWorkers(): Promise<import("../entities/worker").Worker[]>;
}
