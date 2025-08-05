import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enums';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  hashed_password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'user' })
  userType: string;
}
