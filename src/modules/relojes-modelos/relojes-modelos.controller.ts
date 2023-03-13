import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RelojesModelosDTO } from './dto';
import { RelojesModelos } from './entities';
import { RelojesModelosService } from './relojes-modelos.service';

@Controller('relojes-modelos')
export class RelojesModelosController {

  constructor(private readonly relojesModelosService: RelojesModelosService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async modeloPorId(@Res() res, @Param('id') id: number): Promise<RelojesModelos> {
    const modelo = await this.relojesModelosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Modelo obtenido correctamente',
      modelo
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarModelos(@Res() res, @Query() query): Promise<RelojesModelos[]> {
    const modelos = await this.relojesModelosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Modelos obtenidos correctamente',
      modelos
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoModelo(@Res() res, @Body() relojesModelosDTO: RelojesModelosDTO): Promise<RelojesModelos> {

    const modelo = await this.relojesModelosService.insert(relojesModelosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Modelo creado correctamente',
      modelo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarModelo(@Res() res, @Param('id') id: number, @Body() relojesModelosUpdateDTO: any) {

    const modelo = await this.relojesModelosService.update(id, relojesModelosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Modelo actualizado correctamente',
      modelo
    })

  }

}
