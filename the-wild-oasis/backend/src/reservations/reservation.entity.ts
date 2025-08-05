import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  cabinId: number;

  @Column()
  guestId: number;

  @Column()
  hasBreakfast: boolean;

  @Column()
  observation: string;

  @Column()
  isPaid: boolean;

  @Column()
  numGuests: number;
}
