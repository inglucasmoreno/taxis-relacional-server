import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { VehiculosSeguros } from './entities';

@Injectable()
export class VehiculosSegurosService {

  constructor(
    @InjectRepository(VehiculosSeguros) private readonly vehiculosSegurosRepository: Repository<VehiculosSeguros>
  ) { }

  // Seguro por ID
  async getId(id: number): Promise<VehiculosSeguros> {

    const seguro = await this.vehiculosSegurosRepository.findOne({ relations: ['vehiculo', 'empresa'], where: { id } });
    if (!seguro) throw new NotFoundException('La marca no existe');
    return seguro;

  }

  // Listar todos los seguros
  async getAll({
    columna,
    direccion,
    activo,
    parametro,
    desde,
    cantidadItems
  }: any): Promise<any> {

    // Ordenando datos
    let order = {};
    order[columna] = Number(direccion);

    // Filtrando datos
    let where = [];

    // Filtrado por número de poliza
    where.push({ nro_poliza: Like('%' + parametro.toUpperCase() + '%') });
    
    // Filtrado por empresa
    where.push({
      empresa: {
        descripcion: Like('%' + parametro.toUpperCase() + '%')
      }
    });

    const totalItems = await this.vehiculosSegurosRepository.count({ where });

    const seguros = await this.vehiculosSegurosRepository
      .find({
        relations: [
          'vehiculo', 
          'empresa', 
          'creatorUser',
          'updatorUser',
        ],
        order,
        skip: Number(desde),
        take: Number(cantidadItems),
        where
      });

    return {
      seguros,
      totalItems
    };

  }

  // Crear seguro
  async insert(vehiculosSegurosDTO: any): Promise<VehiculosSeguros[]> {

    // Uppercase
    vehiculosSegurosDTO.nro_poliza = vehiculosSegurosDTO.nro_poliza.toLocaleUpperCase().trim();

    const { nro_poliza } = vehiculosSegurosDTO;

    // Verificacion: Nro de poliza repetido
    let seguroDB = await this.vehiculosSegurosRepository.findOneBy({ nro_poliza });
    if (seguroDB) throw new NotFoundException('El número de poliza ya se encuentra cargado');

    const nuevoSeguro = await this.vehiculosSegurosRepository.create(vehiculosSegurosDTO);
    return this.vehiculosSegurosRepository.save(nuevoSeguro);

  }

  // Actualizar seguro
  async update(id: number, vehiculosSegurosUpdateDTO: any): Promise<any> {

    const { nro_poliza } = vehiculosSegurosUpdateDTO;

    const seguroDB = await this.vehiculosSegurosRepository.findOneBy({ id });

    // Verificacion: El seguro no existe
    if (!seguroDB) throw new NotFoundException('El seguro no existe');

    // Verificacion: nro de poliza repetido
    if (nro_poliza) {
      const seguroNroPoliza = await this.vehiculosSegurosRepository.findOneBy({ nro_poliza: nro_poliza.trim().toUpperCase() })
      if (seguroNroPoliza && seguroNroPoliza.id !== id) throw new NotFoundException('El número de poliza ya se encuentra cargado');
    }

    if (nro_poliza) vehiculosSegurosUpdateDTO.nro_poliza = nro_poliza.toLocaleUpperCase();

    await this.vehiculosSegurosRepository.update({ id }, vehiculosSegurosUpdateDTO);
    return this.getId(id);

  }

}
