import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosSeguros } from './entities';
import { VehiculosSegurosController } from './vehiculos-seguros.controller';
import { VehiculosSegurosService } from './vehiculos-seguros.service';

@Module({
  imports: [TypeOrmModule.forFeature([ VehiculosSeguros ])],
  controllers: [VehiculosSegurosController],
  providers: [VehiculosSegurosService]
})
export class VehiculosSegurosModule {}
