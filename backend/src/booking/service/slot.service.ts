/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from '../entities/slot';

@Injectable()
export class SlotService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,
  ) { }

  async getAvailableSlots(): Promise<Slot[]> {
    return await this.slotRepository.find({
      where: { isBooked: false },
      relations: ['worker'],
    });
  }
}
