import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RelojesDTO } from './dto';
import { Relojes } from './entities';
import { RelojesService } from './relojes.service';

@Controller('relojes')
export class RelojesController {

  constructor(private readonly relojesService: RelojesService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async relojPorId(@Res() res, @Param('id') id: number): Promise<Relojes> {

    const reloj = await this.relojesService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reloj obtenido correctamente',
      reloj 
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarRelojes(@Res() res, @Query() query): Promise<Relojes[]> {
    const relojes = await this.relojesService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relojes obtenidos correctamente',
      relojes     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoReloj(@Res() res, @Body() relojesDTO: RelojesDTO): Promise<Relojes> {

    const reloj = await this.relojesService.insert(relojesDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Reloj creado correctamente',
      reloj
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarReloj(@Res() res, @Param('id') id: number, @Body() relojesUpdateDTO: any){

    const reloj = await this.relojesService.update(id, relojesUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reloj actualizado correctamente',
      reloj
    })

  }

}
