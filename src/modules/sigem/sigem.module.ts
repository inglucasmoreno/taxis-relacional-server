import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personas } from '../personas/entities';
import { SigemController } from './sigem.controller';
import { SigemService } from './sigem.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Personas ])],
  controllers: [SigemController],
  providers: [SigemService]
})
export class SigemModule {}
