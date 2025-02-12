/*Disable prettier*/
import { Entity, JoinTable, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Slot } from './slot';
import { Reservation } from './reservation';

export enum professions {
  PLUMBER = 'Plumber',
  CARPENTER = 'Carpenter',
  ELECTRICIAN = 'Electrician',
  PAINTER = 'Painter',
}

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: professions,
    default: professions.CARPENTER,
  })
  specialization: professions;

  @OneToMany(() => Reservation, (reservation) => reservation.worker)
  reservations: Reservation[];

  @ManyToMany(() => Slot, (slots) => slots.worker)
  @JoinTable()
  slots: Slot[];
}
