import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TiposServiciosService } from './tipos-servicios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TiposServicios } from './entities';
import { TiposServiciosDTO } from './dto';

@Controller('tipos-servicios')
export class TiposServiciosController {

  constructor(private readonly tiposServiciosService: TiposServiciosService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async tipoPorId(@Res() res, @Param('id') id: number): Promise<TiposServicios> {

    const tipo = await this.tiposServiciosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Tipo de servicio obtenido correctamente',
      tipo  
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarTipos(@Res() res, @Query() query): Promise<TiposServicios[]> {
   
    const tipos = await this.tiposServiciosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Tipos de servicio obtenidos correctamente',
      tipos     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevoTipo(@Res() res, @Body() tiposServiciosDTO: TiposServiciosDTO): Promise<TiposServicios> {

    const tipo = await this.tiposServiciosService.insert(tiposServiciosDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Tipo de servicio creado correctamente',
      tipo
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarTipo(@Res() res, @Param('id') id: number, @Body() tiposServiciosUpdateDTO: any){

    const tipo = await this.tiposServiciosService.update(id, tiposServiciosUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Tipo de servicio actualizado correctamente',
      tipo
    })

  }

}
