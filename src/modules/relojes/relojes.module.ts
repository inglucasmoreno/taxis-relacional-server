import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relojes } from './entities';
import { RelojesController } from './relojes.controller';
import { RelojesService } from './relojes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Relojes ])],
  controllers: [RelojesController],
  providers: [RelojesService]
})
export class RelojesModule {}
