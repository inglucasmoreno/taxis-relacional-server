import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VehiculosTitularesDTO } from './dto';
import { VehiculosTitulares } from './entities';
import { VehiculosTitularesService } from './vehiculos_titulares.service';

@Controller('vehiculos-titulares')
export class VehiculosTitularesController {

  constructor(private readonly vehiculosTitularesService: VehiculosTitularesService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async titularPorId(@Res() res, @Param('id') id: number): Promise<VehiculosTitulares> {

    const titular = await this.vehiculosTitularesService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Titular obtenido correctamente',
      titular     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarTitulares(@Res() res, @Query() query): Promise<VehiculosTitulares[]> {
   
    const titulares = await this.vehiculosTitularesService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Titulares obtenidos correctamente',
      titulares   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoTitular(@Res() res, @Body() vehiculosTitularesDTO: VehiculosTitularesDTO): Promise<VehiculosTitulares> {

    const titular = await this.vehiculosTitularesService.insert(vehiculosTitularesDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Titular creado correctamente',
      titular
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Post('/multiples')
  async nuevosTitulares(@Res() res, @Body() titulares: any): Promise<VehiculosTitulares> {

    await this.vehiculosTitularesService.insert(titulares);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Titulares creados correctamente',
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarTitular(@Res() res, @Param('id') id: number, @Body() vehiculosTitularesUpdateDTO: any){

    const titular = await this.vehiculosTitularesService.update(id, vehiculosTitularesUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Titular actualizado correctamente',
      titular
    })

  }

}
