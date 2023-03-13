import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehiculosModelosDTO } from './dto';
import { VehiculosModelos } from './entities';
import { VehiculosModelosService } from './vehiculos-modelos.service';

@Controller('vehiculos-modelos')
export class VehiculosModelosController {

  constructor(private readonly vehiculosModelosService: VehiculosModelosService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async modeloPorId(@Res() res, @Param('id') id: number): Promise<VehiculosModelos> {

    const modelo = await this.vehiculosModelosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Modelo obtenido correctamente',
      modelo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarModelos(@Res() res, @Query() query): Promise<VehiculosModelos[]> {
    const modelos = await this.vehiculosModelosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Modelos obtenidos correctamente',
      modelos
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoModelo(@Res() res, @Body() vehiculosModelosDTO: VehiculosModelosDTO): Promise<VehiculosModelos> {

    const modelo = await this.vehiculosModelosService.insert(vehiculosModelosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Modelo creado correctamente',
      modelo
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarModelo(@Res() res, @Param('id') id: number, @Body() vehiculosModelosUpdateDTO: any) {

    const modelo = await this.vehiculosModelosService.update(id, vehiculosModelosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Modelo actualizado correctamente',
      modelo
    })

  }

}
