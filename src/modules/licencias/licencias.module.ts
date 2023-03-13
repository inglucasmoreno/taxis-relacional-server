import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licencias } from './entities';
import { LicenciasController } from './licencias.controller';
import { LicenciasService } from './licencias.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Licencias ])],
  controllers: [LicenciasController],
  providers: [LicenciasService]
})
export class LicenciasModule {}
