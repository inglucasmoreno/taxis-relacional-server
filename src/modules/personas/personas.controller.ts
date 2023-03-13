import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PersonasDTO } from './dto';
import { Personas } from './entities';
import { PersonasService } from './personas.service';

@Controller('personas')
export class PersonasController {

  constructor(private readonly personasService: PersonasService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async personaPorId(@Res() res, @Param('id') id: number): Promise<Personas> {

    const persona = await this.personasService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Persona obtenida correctamente',
      persona
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarPersonas(@Res() res, @Query() query): Promise<Personas[]> {
    const {personas, totalItems} = await this.personasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Personas obtenidas correctamente',
      personas,
      totalItems
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaPersona(@Res() res, @Body() personasDTO: PersonasDTO): Promise<Personas> {

    const persona = await this.personasService.insert(personasDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Persona creada correctamente',
      persona
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarPersona(@Res() res, @Param('id') id: number, @Body() personasUpdateDTO: any) {

    const persona = await this.personasService.update(id, personasUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Persona actualizada correctamente',
      persona
    })

  }


}
