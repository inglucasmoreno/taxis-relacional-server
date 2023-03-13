import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelojesPrecintosMotivos } from './entities';
import { RelojesPrecintosMotivosController } from './relojes-precintos-motivos.controller';
import { RelojesPrecintosMotivosService } from './relojes-precintos-motivos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ RelojesPrecintosMotivos ])],
  controllers: [RelojesPrecintosMotivosController],
  providers: [RelojesPrecintosMotivosService]
})
export class RelojesPrecintosMotivosModule {}
