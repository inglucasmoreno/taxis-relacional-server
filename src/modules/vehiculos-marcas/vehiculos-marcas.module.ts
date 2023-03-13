import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosMarcas } from './entities';
import { VehiculosMarcasController } from './vehiculos-marcas.controller';
import { VehiculosMarcasService } from './vehiculos-marcas.service';

@Module({
  imports: [TypeOrmModule.forFeature([ VehiculosMarcas ])],
  controllers: [VehiculosMarcasController],
  providers: [VehiculosMarcasService]
})
export class VehiculosMarcasModule {}
