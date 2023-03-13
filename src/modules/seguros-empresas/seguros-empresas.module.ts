import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegurosEmpresas } from './entities';
import { SegurosEmpresasController } from './seguros-empresas.controller';
import { SegurosEmpresasService } from './seguros-empresas.service';

@Module({
  imports: [TypeOrmModule.forFeature([ SegurosEmpresas ])],
  controllers: [SegurosEmpresasController],
  providers: [SegurosEmpresasService]
})
export class SegurosEmpresasModule {}
