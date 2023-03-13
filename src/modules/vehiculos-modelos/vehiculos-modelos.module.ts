import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosModelos } from './entities';
import { VehiculosModelosController } from './vehiculos-modelos.controller';
import { VehiculosModelosService } from './vehiculos-modelos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ VehiculosModelos ])],
  controllers: [VehiculosModelosController],
  providers: [VehiculosModelosService]
})
export class VehiculosModelosModule {}
