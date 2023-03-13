import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personas } from './entities';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Personas ])],
  controllers: [PersonasController],
  providers: [PersonasService]
})
export class PersonasModule {}
