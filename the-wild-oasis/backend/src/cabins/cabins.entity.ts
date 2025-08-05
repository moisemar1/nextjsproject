import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cabin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxCapacity: number;

  @Column()
  regularPrice: number;

  @Column()
  discount: number;

  @Column()
  image: string;

  @Column({ type: 'nvarchar', length: 'max' })
  description: string;
}
