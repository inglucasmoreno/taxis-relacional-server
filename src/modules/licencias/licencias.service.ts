import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { LicenciasChoferes } from '../licencias-choferes/entities';
import { LicenciasPermisionarios } from '../licencias-permisionario/entities';
import { LicenciasVehiculos } from '../licencias-vehiculos/entities';
import { Licencias } from './entities';

@Injectable()
export class LicenciasService {

  constructor(
    @InjectRepository(Licencias) private readonly licenciasRepository: Repository<Licencias>,
    @InjectRepository(LicenciasPermisionarios) private readonly licenciasPermisionariosRepository: Repository<LicenciasPermisionarios>,
    @InjectRepository(LicenciasChoferes) private readonly licenciasChoferesRepository: Repository<LicenciasChoferes>,
    @InjectRepository(LicenciasVehiculos) private readonly licenciasVehiculosRepository: Repository<LicenciasVehiculos>,
  ) { }

  // Licencia por ID
  async getId(id: number): Promise<any> {

    // Licencia
    const licencia = await this.licenciasRepository.findOne({ relations: ['licencia_chofer', 'licencia_permisionario', 'tipo_servicio', 'creatorUser', 'updatorUser'], where: { id } });

    if (!licencia) throw new NotFoundException('La licencia no existe');

    const permisionario = await this.licenciasPermisionariosRepository.findOne({
      relations: ['persona', 'creatorUser', 'updatorUser'],
      where: {
        licencia: { id },
        activo: true
      }
    });

    const vehiculo = await this.licenciasVehiculosRepository.findOne({

      relations: {
        vehiculo: {
          marca: true,
          modelo: true
        },
        creatorUser: true,
        updatorUser: true
      },

      where: {
        licencia: { id },
        activo: true
      },

    });

    const choferes = await this.licenciasChoferesRepository.find({

      relations: ['persona', 'creatorUser', 'updatorUser'],
      where: {
        licencia: { id },
      },
      order: {
        activo: -1,
        persona: { apellido: 1 }
      }
    });

    return {
      licencia,
      permisionario,
      choferes,
      vehiculo
    };

  }

  // Listar todas las licencias
  async getAll({
    columna,
    direccion,
    activo,
    parametro,
    tipo_servicio,
    estado,
    desde,
    cantidadItems
  }: any): Promise<any> {

    // Ordenando datos
    let order = {};
    order[columna] = Number(direccion);

    // Filtrando datos
    let where = [];

    let objFilter: any = {};
    objFilter.nro_licencia = Like('%' + parametro.toUpperCase() + '%');
    if(estado && estado !== '') objFilter.estado = estado;
    if(tipo_servicio && tipo_servicio !== '') objFilter.tipo_servicio = { id: Number(tipo_servicio) };

    console.log(objFilter);

    where.push(objFilter);

    const totalItems = await this.licenciasRepository.count({ where });

    const licencias = await this.licenciasRepository
      .find({
        relations: [
          'tipo_servicio',
          'creatorUser',
          'updatorUser',
        ],
        order,
        skip: Number(desde),
        take: Number(cantidadItems),
        where
      });

    return {
      licencias,
      totalItems
    };

  }

  // Crear licencia
  async insert(licenciasDTO: any): Promise<Licencias[]> {

    // Uppercase
    licenciasDTO.estado = licenciasDTO.estado?.toLocaleUpperCase().trim();

    const { nro_licencia } = licenciasDTO;

    // Verificacion: Nro de licencia repetido
    let licenciaDB = await this.licenciasRepository.findOneBy({ nro_licencia });
    if (licenciaDB) throw new NotFoundException('La licencia ya se encuentra cargada');

    const nuevaLicencia = await this.licenciasRepository.create(licenciasDTO);
    return this.licenciasRepository.save(nuevaLicencia);

  }

  // Actualizar licencia
  async update(id: number, licenciasUpdateDTO: any): Promise<any> {

    const { nro_licencia } = licenciasUpdateDTO;

    const licenciaDB = await this.licenciasRepository.findOneBy({ id });

    // Verificacion: La licencia no existe
    if (!licenciaDB) throw new NotFoundException('La licencia no existe');

    // Verificacion: Nro de licencia repetida
    if (nro_licencia) {
      const licenciaNroRepetido = await this.licenciasRepository.findOneBy({ nro_licencia: nro_licencia.trim() })
      if (licenciaNroRepetido && licenciaNroRepetido.id !== id) throw new NotFoundException('Le número de licencia ya se encuentra cargado');
    }

    if (nro_licencia) licenciasUpdateDTO.nro_licencia = nro_licencia.toLocaleUpperCase();

    await this.licenciasRepository.update({ id }, licenciasUpdateDTO);
    return this.getId(id);

  }

}
