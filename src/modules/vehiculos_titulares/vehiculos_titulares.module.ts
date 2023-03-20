import { Module } from '@nestjs/common';
import { VehiculosTitularesController } from './vehiculos_titulares.controller';
import { VehiculosTitularesService } from './vehiculos_titulares.service';

@Module({
  controllers: [VehiculosTitularesController],
  providers: [VehiculosTitularesService]
})
export class VehiculosTitularesModule {}
