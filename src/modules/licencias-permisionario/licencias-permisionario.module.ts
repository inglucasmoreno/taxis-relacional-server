import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenciasPermisionarios } from './entities';
import { LicenciasPermisionarioController } from './licencias-permisionario.controller';
import { LicenciasPermisionarioService } from './licencias-permisionario.service';

@Module({
  imports: [TypeOrmModule.forFeature([ LicenciasPermisionarios ])],
  controllers: [LicenciasPermisionarioController],
  providers: [LicenciasPermisionarioService]
})
export class LicenciasPermisionarioModule {}
