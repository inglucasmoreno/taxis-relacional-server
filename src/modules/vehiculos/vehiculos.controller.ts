import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehiculosDTO } from './dto';
import { Vehiculos } from './entities';
import { VehiculosService } from './vehiculos.service';

@Controller('vehiculos')
export class VehiculosController {

  constructor(private readonly vehiculosService: VehiculosService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async vehiculoPorId(@Res() res, @Param('id') id: number): Promise<Vehiculos> {

    const vehiculo = await this.vehiculosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Vehiculo obtenido correctamente',
      vehiculo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarVehiculos(@Res() res, @Query() query): Promise<Vehiculos[]> {
    const {vehiculos, totalItems} = await this.vehiculosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Vehiculos obtenidos correctamente',
      vehiculos,
      totalItems
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoVehiculo(@Res() res, @Body() vehiculosDTO: VehiculosDTO): Promise<Vehiculos> {

    const vehiculo = await this.vehiculosService.insert(vehiculosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Vehiculo creado correctamente',
      vehiculo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarVehiculo(@Res() res, @Param('id') id: number, @Body() vehiculosUpdateDTO: any) {

    const vehiculo = await this.vehiculosService.update(id, vehiculosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Vehiculo actualizado correctamente',
      vehiculo
    })

  }

}
