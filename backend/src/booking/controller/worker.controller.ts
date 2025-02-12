/* eslint-disable prettier/prettier */
import { Get } from '@nestjs/common';
import { WorkerService } from './../service/worker.service';
import { Controller } from '@nestjs/common';

@Controller('worker')
export class WorkerController {
    constructor(private readonly workerService: WorkerService) { }

    @Get()
    async getAllWorkers() {
        return await this.workerService.getAllWorkers();
    }
}
