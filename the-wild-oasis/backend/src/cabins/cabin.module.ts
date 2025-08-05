import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cabin } from './cabins.entity';
import { CabinService } from './cabin.service';
import { CabinController } from './cabin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cabin])],
  providers: [CabinService],
  controllers: [CabinController],
})
export class CabinModule {}
