import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsBoolean,
} from 'class-validator';
export class ReservationDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  cabinId: number;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  guestId: number;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsNotEmpty()
  hasBreakfast: boolean;

  @IsString()
  observation: string;

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  numGuests: number;
}
