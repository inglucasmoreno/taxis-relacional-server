import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelojesModelos } from './entities';
import { RelojesModelosController } from './relojes-modelos.controller';
import { RelojesModelosService } from './relojes-modelos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ RelojesModelos ])],
  controllers: [RelojesModelosController],
  providers: [RelojesModelosService]
})
export class RelojesModelosModule {}
