import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../usuarios/entities';
import { InicializacionController } from './inicializacion.controller';
import { InicializacionService } from './inicializacion.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Usuarios ]) ],
  controllers: [InicializacionController],
  providers: [InicializacionService]
})
export class InicializacionModule {}
