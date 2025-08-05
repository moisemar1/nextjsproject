import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import type { Request } from 'express';
import { ReservationDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';

@Controller('reservations')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createReservation(@Body() dto: ReservationDto, @Req() req: Request) {
    const user = req.user as User;
    dto.guestId = user.id;
    const reservation = this.reservationService.createReservation(dto);
    return reservation;
  }
}
