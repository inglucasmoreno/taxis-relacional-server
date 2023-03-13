import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehiculosColoresDTO, VehiculosColoresUpdateDTO } from './dto';
import { VehiculosColores } from './entities';
import { VehiculosColoresService } from './vehiculos-colores.service';

@Controller('vehiculos-colores')
export class VehiculosColoresController {

  constructor(private readonly vehiculosColoresService: VehiculosColoresService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async colorPorId(@Res() res, @Param('id') id: number): Promise<VehiculosColores> {

    const color = await this.vehiculosColoresService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Color obtenido correctamente',
      color     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarColores(@Res() res, @Query() query): Promise<VehiculosColores[]> {
   
    const colores = await this.vehiculosColoresService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Colores obtenidos correctamente',
      colores     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoColor(@Res() res, @Body() vehiculosColoresDTO: VehiculosColoresDTO): Promise<VehiculosColores> {

    const color = await this.vehiculosColoresService.insert(vehiculosColoresDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Color creado correctamente',
      color
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarColor(@Res() res, @Param('id') id: number, @Body() vehiculosColoresUpdateDTO: any){

    const color = await this.vehiculosColoresService.update(id, vehiculosColoresUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Color actualizado correctamente',
      color
    })

  }

}
