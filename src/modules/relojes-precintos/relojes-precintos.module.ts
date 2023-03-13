import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelojesPrecintos } from './entities';
import { RelojesPrecintosController } from './relojes-precintos.controller';
import { RelojesPrecintosService } from './relojes-precintos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ RelojesPrecintos ])],
  controllers: [RelojesPrecintosController],
  providers: [RelojesPrecintosService]
})
export class RelojesPrecintosModule {}
