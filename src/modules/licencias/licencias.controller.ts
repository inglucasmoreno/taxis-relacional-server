import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LicenciasDTO } from './dto';
import { Licencias } from './entities';
import { LicenciasService } from './licencias.service';

@Controller('licencias')
export class LicenciasController {

  constructor(private readonly licenciasService: LicenciasService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async licenciaPorId(@Res() res, @Param('id') id: number): Promise<Licencias> {

    const { licencia, permisionario, choferes, vehiculo } = await this.licenciasService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Licencia obtenida correctamente',
      licencia,
      permisionario,
      choferes,
      vehiculo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarLicencias(@Res() res, @Query() query): Promise<Licencias[]> {
    const licencias = await this.licenciasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Licencias obtenidos correctamente',
      licencias
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaLicencia(@Res() res, @Body() licenciasDTO: LicenciasDTO): Promise<Licencias> {

    const licencia = await this.licenciasService.insert(licenciasDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Licencia creado correctamente',
      licencia
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarLicencia(@Res() res, @Param('id') id: number, @Body() licenciasUpdateDTO: any) {

    const licencia = await this.licenciasService.update(id, licenciasUpdateDTO);

    console.log(licencia);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Licencia actualizada correctamente',
      licencia
    })

  }

}
