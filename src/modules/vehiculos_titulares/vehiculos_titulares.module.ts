import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosTitulares } from './entities';
import { VehiculosTitularesController } from './vehiculos_titulares.controller';
import { VehiculosTitularesService } from './vehiculos_titulares.service';

@Module({
  imports: [TypeOrmModule.forFeature([ VehiculosTitulares ])],
  controllers: [VehiculosTitularesController],
  providers: [VehiculosTitularesService]
})
export class VehiculosTitularesModule {}
