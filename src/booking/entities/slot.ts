import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { Worker } from './worker';
import { Reservation } from './reservation';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'time',
    nullable: false,
  })
  time: string;

  @Column({ default: false })
  isBooked: boolean;

  @ManyToMany(() => Worker, (worker) => worker.slots)
  worker: Worker[];

  @OneToOne(() => Reservation, (reservation) => reservation.slot)
  reservation: Reservation;
}
