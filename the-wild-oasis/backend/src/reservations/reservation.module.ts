import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from './reservation.controller';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
