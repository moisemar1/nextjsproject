import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cabin } from './cabins.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CabinService {
  constructor(
    @InjectRepository(Cabin)
    private cabinRepository: Repository<Cabin>,
  ) {}

  findAll(): Promise<Cabin[]> {
    return this.cabinRepository.find();
  }
}
