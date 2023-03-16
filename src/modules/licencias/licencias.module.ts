import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenciasChoferes } from '../licencias-choferes/entities';
import { LicenciasPermisionarios } from '../licencias-permisionario/entities';
import { LicenciasVehiculos } from '../licencias-vehiculos/entities';
import { Licencias } from './entities';
import { LicenciasController } from './licencias.controller';
import { LicenciasService } from './licencias.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      Licencias, 
      LicenciasPermisionarios, 
      LicenciasChoferes,
      LicenciasVehiculos
    ])
  ],
  controllers: [LicenciasController],
  providers: [LicenciasService]
})
export class LicenciasModule {}
