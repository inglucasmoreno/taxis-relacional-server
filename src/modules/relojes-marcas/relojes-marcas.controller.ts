import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RelojesMarcasDTO } from './dto';
import { RelojesMarcas } from './entities';
import { RelojesMarcasService } from './relojes-marcas.service';

@Controller('relojes-marcas')
export class RelojesMarcasController {

  constructor(private readonly relojesMarcasService: RelojesMarcasService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async marcaPorId(@Res() res, @Param('id') id: number): Promise<RelojesMarcas> {

    const marca = await this.relojesMarcasService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marca obtenida correctamente',
      marca     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarMarcas(@Res() res, @Query() query): Promise<RelojesMarcas[]> {
    const marcas = await this.relojesMarcasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marcas obtenids correctamente',
      marcas     
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaMarca(@Res() res, @Body() relojesMarcasDTO: RelojesMarcasDTO): Promise<RelojesMarcas> {

    const marca = await this.relojesMarcasService.insert(relojesMarcasDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Marca creada correctamente',
      marca
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarMarca(@Res() res, @Param('id') id: number, @Body() relojesMarcasUpdateDTO: any){

    const marca = await this.relojesMarcasService.update(id, relojesMarcasUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marca actualizada correctamente',
      marca
    })

  }

}
