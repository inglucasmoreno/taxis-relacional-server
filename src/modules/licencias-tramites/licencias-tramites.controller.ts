import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { LicenciasTramitesService } from './licencias-tramites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CambioUnidadDTO } from './dto';

@Controller('licencias-tramites')
export class LicenciasTramitesController {

  constructor(private readonly licenciasTramitesService: LicenciasTramitesService){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async licenciasTramites(@Res() res, @Body() cambioUnidadDTO: CambioUnidadDTO): Promise<any> {

    const vehiculo = await this.licenciasTramitesService.cambioDeUnidad(cambioUnidadDTO);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Licencia actualizada correctamente',
      vehiculo
    })
  
  }

}
