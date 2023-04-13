import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { LicenciasTramitesService } from './licencias-tramites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CambioUnidadDTO, TransferenciaCambioUnidadDTO, TransferenciaContinuandoDTO } from './dto';

@Controller('licencias-tramites')
export class LicenciasTramitesController {

  constructor(private readonly licenciasTramitesService: LicenciasTramitesService){}

  // Transferencia continuada
  @UseGuards(JwtAuthGuard)
  @Post('/transferencia-continuando')
  async transferenciaContinuando(@Res() res, @Body() transferenciaContinuandoDTO: TransferenciaContinuandoDTO): Promise<any> {

    const relacion = await this.licenciasTramitesService.transferenciaContinuando(transferenciaContinuandoDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Licencia actualizada correctamente',
      relacion
    })
  
  }

  // Transferencia con cambio de unidad
  @UseGuards(JwtAuthGuard)
  @Post('/transferencia-cambio-unidad')
  async transferenciaCambioUnidad(@Res() res, @Body() transferenciaCambioUnidadDTO: TransferenciaCambioUnidadDTO): Promise<any> {

    const { relacion_vehiculo, relacion_permisionario } = await this.licenciasTramitesService.transferenciaCambioUnidad(transferenciaCambioUnidadDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Licencia actualizada correctamente',
      relacion_vehiculo,
      relacion_permisionario
    })
  
  }

  // Cambio de unidad
  @UseGuards(JwtAuthGuard)
  @Post('/cambio-unidad')
  async cambioUnidad(@Res() res, @Body() cambioUnidadDTO: CambioUnidadDTO): Promise<any> {

    const relacion = await this.licenciasTramitesService.cambioDeUnidad(cambioUnidadDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Licencia actualizada correctamente',
      relacion
    })
  
  }

}
