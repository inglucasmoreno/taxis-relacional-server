import { Module } from '@nestjs/common';
import { VehiculosColoresService } from './vehiculos-colores.service';
import { VehiculosColoresController } from './vehiculos-colores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosColores } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([ VehiculosColores ])],
  providers: [VehiculosColoresService],
  controllers: [VehiculosColoresController]
})
export class VehiculosColoresModule {}
