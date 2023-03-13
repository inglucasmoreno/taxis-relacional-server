import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RelojesPrecintosMotivosDTO } from './dto';
import { RelojesPrecintosMotivos } from './entities';
import { RelojesPrecintosMotivosService } from './relojes-precintos-motivos.service';

@Controller('relojes-precintos-motivos')
export class RelojesPrecintosMotivosController {

  constructor(private readonly relojesPrecintosMotivosService: RelojesPrecintosMotivosService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async motivoPorId(@Res() res, @Param('id') id: number): Promise<RelojesPrecintosMotivos> {

    const motivo = await this.relojesPrecintosMotivosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Motivo obtenido correctamente',
      motivo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarMotivos(@Res() res, @Query() query): Promise<RelojesPrecintosMotivos[]> {
    const motivos = await this.relojesPrecintosMotivosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Motivos obtenidos correctamente',
      motivos
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoMotivo(@Res() res, @Body() relojesPrecintosMotivosDTO: RelojesPrecintosMotivosDTO): Promise<RelojesPrecintosMotivos> {

    const motivo = await this.relojesPrecintosMotivosService.insert(relojesPrecintosMotivosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Motivo creado correctamente',
      motivo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarMotivo(@Res() res, @Param('id') id: number, @Body() relojesPrecintosMotivosUpdateDTO: any) {

    const motivo = await this.relojesPrecintosMotivosService.update(id, relojesPrecintosMotivosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Motivo actualizado correctamente',
      motivo
    })

  }

}
