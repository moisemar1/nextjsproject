import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import type { Request } from 'express';
import { ReservationDto } from './dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async createReservation(dto: ReservationDto) {
    try {
      await this.reservationRepository.save(dto);
    } catch (error) {
      throw new ForbiddenException('error creating the reservation');
    }
    return { msg: 'Reservation booked' };
  }
}
