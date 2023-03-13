import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenciasVehiculos } from './entities';
import { LicenciasVehiculosController } from './licencias-vehiculos.controller';
import { LicenciasVehiculosService } from './licencias-vehiculos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ LicenciasVehiculos ])],
  controllers: [LicenciasVehiculosController],
  providers: [LicenciasVehiculosService]
})
export class LicenciasVehiculosModule {}
