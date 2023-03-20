import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehiculosSegurosDTO } from './dto';
import { VehiculosSeguros } from './entities';
import { VehiculosSegurosService } from './vehiculos-seguros.service';

@Controller('vehiculos-seguros')
export class VehiculosSegurosController {

  constructor(private readonly vehiculosSegurosService: VehiculosSegurosService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async seguroPorId(@Res() res, @Param('id') id: number): Promise<VehiculosSeguros> {

    const seguro = await this.vehiculosSegurosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Seguro obtenido correctamente',
      seguro     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarSeguros(@Res() res, @Query() query): Promise<VehiculosSeguros[]> {
    const {seguros, totalItems, seguroActivo} = await this.vehiculosSegurosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Seguros obtenidos correctamente',
      seguros,
      totalItems,     
      seguroActivo,
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoSeguro(@Res() res, @Body() vehiculosSegurosDTO: VehiculosSegurosDTO): Promise<VehiculosSeguros> {

    const seguro = await this.vehiculosSegurosService.insert(vehiculosSegurosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Seguro creado correctamente',
      seguro
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarSeguro(@Res() res, @Param('id') id: number, @Body() vehiculosSegurosUpdateDTO: any){

    const seguro = await this.vehiculosSegurosService.update(id, vehiculosSegurosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Seguro actualizado correctamente',
      seguro
    })

  }

}
