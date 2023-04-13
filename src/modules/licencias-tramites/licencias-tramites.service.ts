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

  // Transferencia -> Continuando (Sin cambio de unidad)
  async transferenciaContinuando(data: any): Promise<any> {

    const { licencia, persona } = data;

    // Verificacion -> Ya es permisionario de esta licencia
    let permisionarioRepetido = null;

    permisionarioRepetido = await this.licenciasPermisionariosRepository.findOne({
      relations: {
        licencia: true,
        persona: true
      },
      where: {
        persona: { id: persona }, 
        activo: true 
    }});

    if (permisionarioRepetido) throw new NotFoundException(`La persona ya es permisionario de la licencia ${permisionarioRepetido.licencia.nro_licencia}`);

    // Alta y Baja de permisionario
    let permisionarioAlta = await this.licenciasPermisionariosRepository.create(data);

    const [_, permisionarioAltaDB] = await Promise.all([
      this.licenciasPermisionariosRepository.update({ licencia, activo: true },{ activo: false }),
      this.licenciasPermisionariosRepository.save(permisionarioAlta)
    ])
  
    return permisionarioAltaDB;

  }

  // Transferencia -> Con cambio de unidad
  async transferenciaCambioUnidad(data: any): Promise<any> {

    const { licencia, persona, vehiculo } = data;

    // Verificacion -> Ya es permisionario de esta licencia
    // Verificacion -> Vehiculo activo en esta licencia
    
    let permisionarioRepetido = null;
    let vehiculoRepetido = null;

    [permisionarioRepetido, vehiculoRepetido] = await Promise.all([
      this.licenciasPermisionariosRepository.findOne({
        relations: {
          licencia: true,
          persona: true
        },
        where: {
          persona: { id: persona }, 
          activo: true 
      }}),
      this.licenciasVehiculosRepository.findOne({
        relations: {
          licencia: true,
          vehiculo: true
        },
        where: {
          vehiculo: { id: vehiculo }, 
          activo: true 
      }})
    ])

    if (permisionarioRepetido) throw new NotFoundException(`La persona ya es permisionario de la licencia ${permisionarioRepetido.licencia.nro_licencia}`);
    if (vehiculoRepetido) throw new NotFoundException(`El vehículo ya se encuentra asociado a la licencia ${vehiculoRepetido.licencia.nro_licencia}`);

    // Alta y Baja de permisionario
    let permisionarioAlta = await this.licenciasPermisionariosRepository.create(data);

    const [_, permisionarioAltaDB] = await Promise.all([
      this.licenciasPermisionariosRepository.update({ licencia, activo: true },{ activo: false }),
      this.licenciasPermisionariosRepository.save(permisionarioAlta)
    ])

    // Alta y Baja de unidad
    let vehiculoAlta = await this.licenciasVehiculosRepository.create(data);

    const [__, vehiculoAltaDB] = await Promise.all([
      this.licenciasVehiculosRepository.update({ licencia, activo: true }, { activo: false }),
      this.licenciasVehiculosRepository.save(vehiculoAlta)   
    ])

    return {
      relacion_permisionario: permisionarioAltaDB,
      relacion_vehiculo: vehiculoAltaDB
    };

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

    // Alta y Baja de unidad
    let vehiculoAlta = await this.licenciasVehiculosRepository.create(data);

    const [_, vehiculoAltaDB] = await Promise.all([
      this.licenciasVehiculosRepository.update({ licencia, activo: true }, { activo: false }),
      this.licenciasVehiculosRepository.save(vehiculoAlta)   
    ])

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
