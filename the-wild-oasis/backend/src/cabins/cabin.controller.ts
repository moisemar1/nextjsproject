import { Controller, Get } from '@nestjs/common';
import { CabinService } from './cabin.service';
import { Cabin } from './cabins.entity';
@Controller('cabins')
export class CabinController {
  constructor(private cabinService: CabinService) {}

  @Get()
  findAll(): Promise<Cabin[]> {
    return this.cabinService.findAll();
  }
}
