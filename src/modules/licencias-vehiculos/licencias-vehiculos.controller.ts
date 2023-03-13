import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LicenciasVehiculosDTO } from './dto';
import { LicenciasVehiculos } from './entities';
import { LicenciasVehiculosService } from './licencias-vehiculos.service';

@Controller('licencias-vehiculos')
export class LicenciasVehiculosController {

  constructor(private readonly licenciasVehiculosService: LicenciasVehiculosService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async relacionPorId(@Res() res, @Param('id') id: number): Promise<LicenciasVehiculos> {

    const relacion = await this.licenciasVehiculosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion obtenida correctamente',
      relacion     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarRelaciones(@Res() res, @Query() query): Promise<LicenciasVehiculos[]> {
    const relaciones = await this.licenciasVehiculosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relaciones obtenidas correctamente',
      relaciones    
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaRelacion(@Res() res, @Body() licenciasVehiculosDTO: LicenciasVehiculosDTO): Promise<LicenciasVehiculos> {

    const relacion = await this.licenciasVehiculosService.insert(licenciasVehiculosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Relacion creada correctamente',
      relacion
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarRelacion(@Res() res, @Param('id') id: number, @Body() licenciasVehiculosUpdateDTO: any){

    const relacion = await this.licenciasVehiculosService.update(id, licenciasVehiculosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion actualizada correctamente',
      relacion
    })

  }

}
