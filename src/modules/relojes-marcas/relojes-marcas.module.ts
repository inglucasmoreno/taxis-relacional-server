import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelojesMarcas } from './entities';
import { RelojesMarcasController } from './relojes-marcas.controller';
import { RelojesMarcasService } from './relojes-marcas.service';

@Module({
  imports: [TypeOrmModule.forFeature([ RelojesMarcas ])],
  controllers: [RelojesMarcasController],
  providers: [RelojesMarcasService]
})
export class RelojesMarcasModule {}
