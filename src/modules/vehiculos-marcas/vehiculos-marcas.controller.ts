import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehiculosMarcasDTO } from './dto/vehiculos-marcas.dto';
import { VehiculosMarcas } from './entities';
import { VehiculosMarcasService } from './vehiculos-marcas.service';

@Controller('vehiculos-marcas')
export class VehiculosMarcasController {

  constructor(private readonly vehiculosMarcasService: VehiculosMarcasService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async marcaPorId(@Res() res, @Param('id') id: number): Promise<VehiculosMarcas> {

    const marca = await this.vehiculosMarcasService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marca obtenida correctamente',
      marca     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarMarcas(@Res() res, @Query() query): Promise<VehiculosMarcas[]> {
    const marcas = await this.vehiculosMarcasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marcas obtenidas correctamente',
      marcas     
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaMarca(@Res() res, @Body() vehiculosMarcasDTO: VehiculosMarcasDTO): Promise<VehiculosMarcas> {

    const marca = await this.vehiculosMarcasService.insert(vehiculosMarcasDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Marca creada correctamente',
      marca
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarMarca(@Res() res, @Param('id') id: number, @Body() vehiculosMarcasUpdateDTO: any){

    const marca = await this.vehiculosMarcasService.update(id, vehiculosMarcasUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marca actualizada correctamente',
      marca
    })

  }

}
