import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SegurosEmpresasDTO } from './dto';
import { SegurosEmpresas } from './entities';
import { SegurosEmpresasService } from './seguros-empresas.service';

@Controller('seguros-empresas')
export class SegurosEmpresasController {

  constructor(private readonly segurosEmpresasService: SegurosEmpresasService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async empresaPorId(@Res() res, @Param('id') id: number): Promise<SegurosEmpresas> {

    const empresa = await this.segurosEmpresasService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Empresa obtenida correctamente',
      empresa    
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarEmpresas(@Res() res, @Query() query): Promise<SegurosEmpresas[]> {
    const empresas = await this.segurosEmpresasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Empresas obtenidas correctamente',
      empresas    
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async nuevaEmpresa(@Res() res, @Body() segurosEmpresasDTO: SegurosEmpresasDTO): Promise<SegurosEmpresas> {

    const empresa = await this.segurosEmpresasService.insert(segurosEmpresasDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Empresa creada correctamente',
      empresa
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async actualizarEmpresa(@Res() res, @Param('id') id: number, @Body() segurosEmpresasUpdateDTO: any){

    const empresa = await this.segurosEmpresasService.update(id, segurosEmpresasUpdateDTO);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Empresa actualizada correctamente',
      empresa
    })

  }

}
