/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Slot } from "./slot";
import { Worker } from "./worker";

@Entity()
export class Reservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @ManyToOne(() => Worker, worker => worker.reservations)
    worker: Worker;

    @OneToOne(() => Slot, (slot) => slot.reservation)
    @JoinColumn()
    slot: Slot;

}
