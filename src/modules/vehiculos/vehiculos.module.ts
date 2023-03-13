import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculos } from './entities';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Vehiculos ])],
  controllers: [VehiculosController],
  providers: [VehiculosService]
})
export class VehiculosModule {}
