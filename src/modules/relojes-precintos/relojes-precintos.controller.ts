import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RelojesPrecintosDTO } from './dto';
import { RelojesPrecintos } from './entities';
import { RelojesPrecintosService } from './relojes-precintos.service';

@Controller('relojes-precintos')
export class RelojesPrecintosController {

  constructor(private readonly relojesPrecintosService: RelojesPrecintosService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async precintoPorId(@Res() res, @Param('id') id: number): Promise<RelojesPrecintos> {

    const precinto = await this.relojesPrecintosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Precinto obtenido correctamente',
      precinto
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarPrecintos(@Res() res, @Query() query): Promise<RelojesPrecintos[]> {
    const precintos = await this.relojesPrecintosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Precintos obtenidos correctamente',
      precintos
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoPrecinto(@Res() res, @Body() relojesPrecintosDTO: RelojesPrecintosDTO): Promise<RelojesPrecintos> {

    const precinto = await this.relojesPrecintosService.insert(relojesPrecintosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Precinto creado correctamente',
      precinto
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarMotivo(@Res() res, @Param('id') id: number, @Body() relojesPrecintosUpdateDTO: any) {

    const precinto = await this.relojesPrecintosService.update(id, relojesPrecintosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Precinto actualizado correctamente',
      precinto
    })

  }


}
