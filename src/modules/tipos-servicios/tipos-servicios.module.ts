import { Module } from '@nestjs/common';
import { TiposServiciosService } from './tipos-servicios.service';
import { TiposServiciosController } from './tipos-servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposServicios } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([ TiposServicios ])],
  providers: [TiposServiciosService],
  controllers: [TiposServiciosController]
})
export class TiposServiciosModule {}
