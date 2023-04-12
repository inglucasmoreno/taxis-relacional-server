import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LicenciasPermisionarios } from '../licencias-permisionario/entities';
import { Repository } from 'typeorm';
import { LicenciasChoferes } from '../licencias-choferes/entities';
import { Licencias } from '../licencias/entities';
import { LicenciasVehiculos } from '../licencias-vehiculos/entities';
import { Vehiculos } from '../vehiculos/entities';

@Injectable()
export class LicenciasTramitesService {

  constructor(
    @InjectRepository(LicenciasPermisionarios) private readonly licenciasPermisionariosRepository: Repository<LicenciasPermisionarios>,
    @InjectRepository(LicenciasChoferes) private readonly licenciasChoferesRepository: Repository<LicenciasChoferes>,
    @InjectRepository(Licencias) private readonly licenciasRepository: Repository<Licencias>,
    @InjectRepository(LicenciasVehiculos) private readonly licenciasVehiculosRepository: Repository<LicenciasVehiculos>,
    @InjectRepository(Vehiculos) private readonly vehiculosRepository: Repository<Vehiculos>,
  ) { }

  // Transferencia -> continuando
  async transferenciaContinuando(data: any): Promise<any> {
    return '';
  }

  // Transferencia -> con cambio de unidad
  async transferenciaConCambioDeUnidad(data: any): Promise<any> {
    return '';
  }

  // Cambio de unidad 
  async cambioDeUnidad(data: any): Promise<any> {
    
    const { licencia, vehiculo } = data;

    let vehiculoRepetido = null;
    
    // Verificacion -> Vehiculo activo en esta licencia
    vehiculoRepetido = await this.licenciasVehiculosRepository.findOne({
      relations: {
        licencia: true,
        vehiculo: true
      },
      where: {
        vehiculo: { id: vehiculo }, 
        activo: true 
    }});
      
    if (vehiculoRepetido) throw new NotFoundException(`El vehículo ya se encuentra asociado a la licencia ${vehiculoRepetido.licencia.nro_licencia}`);

    // Baja de vehiculo actual
    await this.licenciasVehiculosRepository.update({ licencia, activo: true }, { activo: false });     

    // Alta de nuevo vehiculo
    let vehiculoAlta = await this.licenciasVehiculosRepository.create(data);
    let vehiculoAltaDB = await this.licenciasVehiculosRepository.save(vehiculoAlta);

    return vehiculoAltaDB;
  
  }

  // Asentar chofer 
  async asentarChofer(data: any): Promise<any> {
    return '';
  }

  // Baja de chofer
  async bajaChofer(data: any): Promise<any> {
    return '';
  }

}
