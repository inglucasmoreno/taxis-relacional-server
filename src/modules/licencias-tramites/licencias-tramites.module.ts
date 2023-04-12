import { Module } from '@nestjs/common';
import { LicenciasTramitesService } from './licencias-tramites.service';
import { LicenciasTramitesController } from './licencias-tramites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenciasPermisionarios } from '../licencias-permisionario/entities';
import { LicenciasChoferes } from '../licencias-choferes/entities';
import { Licencias } from '../licencias/entities';
import { LicenciasVehiculos } from '../licencias-vehiculos/entities';
import { Vehiculos } from '../vehiculos/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      LicenciasPermisionarios,
      LicenciasChoferes,
      Licencias,
      LicenciasVehiculos,
      Vehiculos
    ])
  ],
  providers: [LicenciasTramitesService],
  controllers: [LicenciasTramitesController]
})
export class LicenciasTramitesModule {}
