import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LicenciasChoferesDTO } from './dto';
import { LicenciasChoferes } from './entities';
import { LicenciasChoferesService } from './licencias-choferes.service';

@Controller('licencias-choferes')
export class LicenciasChoferesController {

  constructor(private readonly licenciasChoferesService: LicenciasChoferesService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async relacionPorId(@Res() res, @Param('id') id: number): Promise<LicenciasChoferes> {

    const relacion = await this.licenciasChoferesService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion obtenida correctamente',
      relacion     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarRelaciones(@Res() res, @Query() query): Promise<LicenciasChoferes[]> {
    const relaciones = await this.licenciasChoferesService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relaciones obtenidas correctamente',
      relaciones     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaRelacion(@Res() res, @Body() licenciasChoferesDTO: LicenciasChoferesDTO): Promise<LicenciasChoferes> {

    const relacion = await this.licenciasChoferesService.insert(licenciasChoferesDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Relacion creada correctamente',
      relacion
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarChofer(@Res() res, @Param('id') id: number, @Body() licenciasChoferesUpdateDTO: any){

    const relacion = await this.licenciasChoferesService.update(id, licenciasChoferesUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion actualizada correctamente',
      relacion
    })

  }

}
