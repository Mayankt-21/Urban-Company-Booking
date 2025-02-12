/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from '../entities/worker';
import { Repository } from 'typeorm';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>,
  ) { }

  async getAllWorkers(): Promise<Worker[]> {
    return await this.workerRepository.find({ relations: ['slots'] });
  }

  async getWorkerById(id: number): Promise<Worker> {
    const worker = await this.workerRepository.findOne({
      where: { id },
      relations: ['slots'],
    });

    if (!worker) throw new NotFoundException('Worker Not Found');

    return worker;
  }
}
