import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LicenciasPermisionariosDTO } from './dto';
import { LicenciasPermisionarios } from './entities';
import { LicenciasPermisionarioService } from './licencias-permisionario.service';

@Controller('licencias-permisionario')
export class LicenciasPermisionarioController {

  constructor(private readonly licenciasPermisionariosService: LicenciasPermisionarioService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async relacionPorId(@Res() res, @Param('id') id: number): Promise<LicenciasPermisionarios> {

    const relacion = await this.licenciasPermisionariosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion obtenida correctamente',
      relacion     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarRelaciones(@Res() res, @Query() query): Promise<LicenciasPermisionarios[]> {
    const relaciones = await this.licenciasPermisionariosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relaciones obtenidas correctamente',
      relaciones    
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaRelacion(@Res() res, @Body() licenciasPermisionariosDTO: LicenciasPermisionariosDTO): Promise<LicenciasPermisionarios> {

    const relacion = await this.licenciasPermisionariosService.insert(licenciasPermisionariosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Relacion creada correctamente',
      relacion
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarRelacion(@Res() res, @Param('id') id: number, @Body() licenciasPermisionariosUpdateDTO: any){

    const relacion = await this.licenciasPermisionariosService.update(id, licenciasPermisionariosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion actualizada correctamente',
      relacion
    })

  }

}
