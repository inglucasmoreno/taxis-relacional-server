import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenciasChoferes } from './entities';
import { LicenciasChoferesController } from './licencias-choferes.controller';
import { LicenciasChoferesService } from './licencias-choferes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ LicenciasChoferes ])],
  controllers: [LicenciasChoferesController],
  providers: [LicenciasChoferesService]
})
export class LicenciasChoferesModule {}
